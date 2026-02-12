import fs from "fs";
import path from "path";
import { createHash } from "crypto";

const IMAGE_DIR = path.join(process.cwd(), "public", "blog-images");

// Ensure the image directory exists
function ensureDir() {
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }
}

// Generate a deterministic filename from URL
function getFilename(url: string): string {
  const hash = createHash("md5").update(url).digest("hex").slice(0, 12);
  const urlObj = new URL(url);
  const ext = path.extname(urlObj.pathname).split("?")[0] || ".png";
  return `${hash}${ext}`;
}

// Download an image and return the local path
export async function downloadImage(url: string): Promise<string> {
  ensureDir();

  const filename = getFilename(url);
  const filepath = path.join(IMAGE_DIR, filename);
  const publicPath = `/blog-images/${filename}`;

  // Skip if already downloaded
  if (fs.existsSync(filepath)) {
    return publicPath;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to download image: ${url}`);
      return url; // fallback to original URL
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    return publicPath;
  } catch (error) {
    console.warn(`Error downloading image: ${url}`, error);
    return url; // fallback to original URL
  }
}

// Download cover image for a post
export async function downloadCoverImage(
  coverUrl: string | null
): Promise<string | null> {
  if (!coverUrl) return null;
  return downloadImage(coverUrl);
}
