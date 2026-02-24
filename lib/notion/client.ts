import { Client } from "@notionhq/client";

// NotionAPIClientの初期化

if (!process.env.NOTION_API_SECRET) {
  throw new Error("NOTION_API_SECRET is not defined");
}

export const notion = new Client({
  auth: process.env.NOTION_API_SECRET,
});

export const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? "";

// Helper to retry Notion requests when rate limited.
export async function withNotionRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 5,
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err: unknown) {
      attempt++;
      const e = err as {
        code?: string;
        status?: number;
        headers?: Record<string, unknown> | { get?: (k: string) => string | null };
      };
      const isRateLimited = e?.code === "rate_limited" || e?.status === 429;
      if (!isRateLimited || attempt >= maxRetries) throw err;

      // Respect Retry-After header when present, otherwise exponential backoff
      let waitSeconds = 2 ** attempt;
      try {
        const headers = e?.headers;
        if (headers) {
          // headers may be a Headers object or plain object
          const ra = typeof (headers as { get?: (k: string) => string | null }).get === "function"
            ? (headers as { get: (k: string) => string | null }).get!("retry-after")
            : (headers as Record<string, unknown>)["retry-after"] as unknown;
          if (ra) {
            const parsed = Number(ra as unknown);
            if (!Number.isNaN(parsed)) waitSeconds = parsed;
          }
        }
      } catch {
        // ignore header parsing errors
      }

      // cap wait time
      if (waitSeconds > 60) waitSeconds = 60;
      await new Promise((res) => setTimeout(res, waitSeconds * 1000));
    }
  }
}
