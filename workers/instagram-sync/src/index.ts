// ============================================================
// Instagram → microCMS 同期 Worker
// Cron Trigger (12時間ごと) で実行される
// ============================================================

interface Env {
  // Secrets (wrangler secret put で設定)
  INSTAGRAM_ACCESS_TOKEN: string;
  INSTAGRAM_USER_ID: string;
  MICROCMS_SERVICE_DOMAIN: string;
  MICROCMS_API_KEY: string;
  DISCORD_WEBHOOK_URL?: string;

  // KV Namespace (トークン永続化用)
  TOKEN_STORE: KVNamespace;
}

// --- 型定義 ---

interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

interface InstagramAPIResponse {
  data: InstagramPost[];
  paging?: { next?: string };
}

interface MicroCMSContent {
  id: string;
  instagram_id: string;
  posted_at: string;
}

interface MicroCMSListResponse {
  contents: MicroCMSContent[];
  totalCount: number;
}

interface MicroCMSMediaResponse {
  url: string;
}

// --- 定数 ---

const MAX_POSTS = 12;
const INSTAGRAM_API_BASE = "https://graph.instagram.com";
const TOKEN_REFRESH_THRESHOLD_DAYS = 14;

// --- Worker エントリーポイント ---

export default {
  async scheduled(
    _event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil(syncInstagramPosts(env));
  },

  // ローカル開発用: HTTP リクエストで手動実行
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/__scheduled") {
      ctx.waitUntil(syncInstagramPosts(env));
      return new Response("Sync triggered", { status: 200 });
    }
    return new Response("Instagram Sync Worker", { status: 200 });
  },
};

// --- メイン同期処理 ---

async function syncInstagramPosts(env: Env): Promise<void> {
  try {
    // 1. アクセストークン取得（KV優先、フォールバックで環境変数）
    const token = await getAccessToken(env);

    // 2. Instagram から最新投稿を取得
    const instagramPosts = await fetchInstagramPosts(token, env.INSTAGRAM_USER_ID);
    console.log(`Instagram: ${instagramPosts.length}件の投稿を取得`);

    // 3. microCMS の既存データを取得
    const existingPosts = await fetchExistingPosts(env);
    const existingIds = new Set(existingPosts.map((p) => p.instagram_id));
    console.log(`microCMS: ${existingPosts.length}件の既存投稿`);

    // 4. 新規投稿のみフィルタ
    const newPosts = instagramPosts.filter((p) => !existingIds.has(p.id));
    console.log(`新規投稿: ${newPosts.length}件`);

    // 5. 新規投稿を microCMS に登録
    for (const post of newPosts) {
      try {
        await syncSinglePost(env, post);
        console.log(`同期完了: ${post.id}`);
      } catch (err) {
        console.error(`投稿 ${post.id} の同期に失敗:`, err);
      }
    }

    // 6. 古い投稿のガベージコレクション
    await garbageCollect(env);

    // 7. トークンのリフレッシュ判定
    await refreshTokenIfNeeded(env, token);

    console.log("同期処理完了");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("同期処理でエラー発生:", message);
    await notifyDiscord(env, `Instagram同期エラー: ${message}`);
  }
}

// --- Instagram API ---

async function fetchInstagramPosts(
  token: string,
  userId: string
): Promise<InstagramPost[]> {
  const fields = "id,media_type,media_url,thumbnail_url,caption,permalink,timestamp";
  const url = `${INSTAGRAM_API_BASE}/${userId}/media?fields=${fields}&limit=${MAX_POSTS}&access_token=${token}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Instagram API エラー (${res.status}): ${body}`);
  }

  const data: InstagramAPIResponse = await res.json();
  return data.data;
}

// --- microCMS API ---

async function fetchExistingPosts(env: Env): Promise<MicroCMSContent[]> {
  const url = `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/instagram?fields=id,instagram_id,posted_at&limit=100`;

  const res = await fetch(url, {
    headers: { "X-MICROCMS-API-KEY": env.MICROCMS_API_KEY },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`microCMS GET エラー (${res.status}): ${body}`);
  }

  const data: MicroCMSListResponse = await res.json();
  return data.contents;
}

async function syncSinglePost(env: Env, post: InstagramPost): Promise<void> {
  // メディアURLを決定（VIDEOの場合はサムネイルを使用）
  const mediaUrl =
    post.media_type === "VIDEO"
      ? post.thumbnail_url ?? post.media_url
      : post.media_url;

  if (!mediaUrl) {
    console.warn(`投稿 ${post.id}: メディアURLが取得できません。スキップ。`);
    return;
  }

  // 画像をダウンロード
  const imageRes = await fetch(mediaUrl);
  if (!imageRes.ok) {
    throw new Error(`画像ダウンロード失敗 (${imageRes.status}): ${mediaUrl}`);
  }
  const imageBuffer = await imageRes.arrayBuffer();

  // microCMS にメディアをアップロード
  const uploadedUrl = await uploadMediaToMicroCMS(
    env,
    imageBuffer,
    `instagram_${post.id}.jpg`
  );

  // microCMS にコンテンツを登録
  await createMicroCMSPost(env, post, uploadedUrl);
}

async function uploadMediaToMicroCMS(
  env: Env,
  imageBuffer: ArrayBuffer,
  filename: string
): Promise<string> {
  const formData = new FormData();
  const blob = new Blob([imageBuffer], { type: "image/jpeg" });
  formData.append("file", blob, filename);

  const url = `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms-management.io/api/v1/media`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "X-MICROCMS-API-KEY": env.MICROCMS_API_KEY,
    },
    body: formData,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`microCMS メディアアップロード失敗 (${res.status}): ${body}`);
  }

  const data: MicroCMSMediaResponse = await res.json();
  return data.url;
}

async function createMicroCMSPost(
  env: Env,
  post: InstagramPost,
  imageUrl: string
): Promise<void> {
  const url = `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/instagram`;

  const body = {
    media_type: [post.media_type],
    image: { url: imageUrl },
    caption: post.caption ?? "",
    permalink: post.permalink,
    posted_at: post.timestamp,
    instagram_id: post.id,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "X-MICROCMS-API-KEY": env.MICROCMS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const resBody = await res.text();
    throw new Error(`microCMS POST 失敗 (${res.status}): ${resBody}`);
  }
}

async function deleteMicroCMSPost(env: Env, contentId: string): Promise<void> {
  const url = `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/instagram/${contentId}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: { "X-MICROCMS-API-KEY": env.MICROCMS_API_KEY },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`microCMS DELETE 失敗 (${res.status}): ${body}`);
  }
}

// --- ガベージコレクション ---

async function garbageCollect(env: Env): Promise<void> {
  // posted_at の古い順で全件取得し、MAX_POSTS を超えた分を削除
  const url = `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/instagram?fields=id,posted_at&orders=posted_at&limit=100`;

  const res = await fetch(url, {
    headers: { "X-MICROCMS-API-KEY": env.MICROCMS_API_KEY },
  });

  if (!res.ok) return;

  const data: MicroCMSListResponse = await res.json();

  if (data.totalCount <= MAX_POSTS) return;

  // 古い順にソートされているので、先頭から削除対象
  const toDelete = data.contents.slice(0, data.totalCount - MAX_POSTS);
  console.log(`ガベージコレクション: ${toDelete.length}件を削除`);

  for (const post of toDelete) {
    await deleteMicroCMSPost(env, post.id);
  }
}

// --- トークン管理 ---

async function getAccessToken(env: Env): Promise<string> {
  const kvToken = await env.TOKEN_STORE.get("instagram_access_token");
  return kvToken ?? env.INSTAGRAM_ACCESS_TOKEN;
}

async function refreshTokenIfNeeded(
  env: Env,
  currentToken: string
): Promise<void> {
  // トークンの有効期限を確認
  const url = `${INSTAGRAM_API_BASE}/me?fields=id&access_token=${currentToken}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.warn("トークン検証失敗。リフレッシュを試行します。");
    await refreshToken(env, currentToken);
    return;
  }

  // KV に保存した最終リフレッシュ日をチェック
  const lastRefresh = await env.TOKEN_STORE.get("last_token_refresh");
  if (lastRefresh) {
    const daysSinceRefresh =
      (Date.now() - new Date(lastRefresh).getTime()) / (1000 * 60 * 60 * 24);

    // 60日有効のトークンを、残り14日を切ったらリフレッシュ
    if (daysSinceRefresh < 60 - TOKEN_REFRESH_THRESHOLD_DAYS) {
      return; // まだリフレッシュ不要
    }
  }

  await refreshToken(env, currentToken);
}

async function refreshToken(env: Env, currentToken: string): Promise<void> {
  const url = `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    const message = `トークンリフレッシュ失敗 (${res.status}): ${body}`;
    console.error(message);
    await notifyDiscord(env, message);
    return;
  }

  const data: { access_token: string; expires_in: number } = await res.json();

  // KV に新しいトークンと日時を保存
  await env.TOKEN_STORE.put("instagram_access_token", data.access_token);
  await env.TOKEN_STORE.put("last_token_refresh", new Date().toISOString());

  console.log(
    `トークンリフレッシュ成功。有効期限: ${data.expires_in}秒`
  );
}

// --- Discord 通知 ---

async function notifyDiscord(env: Env, message: string): Promise<void> {
  if (!env.DISCORD_WEBHOOK_URL) return;

  try {
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `⚠️ **Instagram Sync Worker**\n${message}`,
      }),
    });
  } catch (err) {
    console.error("Discord通知送信失敗:", err);
  }
}
