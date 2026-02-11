/**
 * ブログ機能のユーティリティ関数
 */

import { BASE_PATH, CUSTOM_DOMAIN } from '@/lib/constants';
import { NotionBlock } from '@/lib/notion/responses';

/**
 * ファイルパス生成
 */
export function filePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

/**
 * ブログ記事のURLを生成
 */
export function getPostLink(slug: string): string {
  return `${filePath(`/${slug}`)}`;
}

/**
 * 完全なURLを生成（外部用）
 */
export function getPostFullUrl(slug: string): string {
  return `${CUSTOM_DOMAIN}${getPostLink(slug)}`;
}

/**
 * タグページのURLを生成
 */
export function getTagLink(tag: string): string {
  return `${filePath('/tag')}/${encodeURIComponent(tag)}`;
}

/**
 * タグページの完全なURLを生成
 */
export function getTagFullUrl(tag: string): string {
  return `${CUSTOM_DOMAIN}${getTagLink(tag)}`;
}

/**
 * ページネーションのURLを生成
 */
export function getPageLink(page: number): string {
  if (page === 1) {
    return filePath('');
  }
  return `${filePath('/page')}/${page}`;
}

/**
 * ページネーション付きタグページのURLを生成
 */
export function getTagPageLink(tag: string, page: number): string {
  if (page === 1) {
    return getTagLink(tag);
  }
  return `${filePath('/tag')}/${encodeURIComponent(tag)}/page/${page}`;
}

/**
 * 日付をフォーマット（ISO形式 → YYYY年M月D日）
 */
export function formatDate(dateString: string, locale: string = 'ja-JP'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * 日付をフォーマット（YYYY-MM-DD形式）
 */
export function formatDateISO(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

/**
 * 相対時間を表示（例：2日前）
 */
export function getRelativeTime(dateString: string, locale: string = 'ja-JP'): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return '今';
  } else if (minutes < 60) {
    return `${minutes}分前`;
  } else if (hours < 24) {
    return `${hours}時間前`;
  } else if (days < 7) {
    return `${days}日前`;
  } else if (weeks < 4) {
    return `${weeks}週前`;
  } else if (months < 12) {
    return `${months}ヶ月前`;
  } else {
    return `${years}年前`;
  }
}

/**
 * テキストから特定のブロック型を再帰的に抽出
 */
export function extractTargetBlocks(
  blockType: string,
  blocks: NotionBlock[],
): NotionBlock[] {
  const result: NotionBlock[] = [];

  for (const block of blocks) {
    if (block.type === blockType) {
      result.push(block);
    }

    // 子ブロックを持つ場合は再帰的に処理
    if (block.has_children) {
      // Note: 子ブロックは別途取得する必要があります
    }
  }

  return result;
}

/**
 * ブロックから見出し情報を抽出して目次を生成
 */
export function extractHeadingsForTOC(blocks: NotionBlock[]) {
  const headings: Array<{
    id: string;
    title: string;
    level: 1 | 2 | 3;
  }> = [];

  for (const block of blocks) {
    if (block.type === 'heading_1') {
      const heading = block as any;
      headings.push({
        id: block.id,
        title: heading.heading_1.rich_text
          .map((rt: any) => rt.plain_text)
          .join(''),
        level: 1,
      });
    } else if (block.type === 'heading_2') {
      const heading = block as any;
      headings.push({
        id: block.id,
        title: heading.heading_2.rich_text
          .map((rt: any) => rt.plain_text)
          .join(''),
        level: 2,
      });
    } else if (block.type === 'heading_3') {
      const heading = block as any;
      headings.push({
        id: block.id,
        title: heading.heading_3.rich_text
          .map((rt: any) => rt.plain_text)
          .join(''),
        level: 3,
      });
    }
  }

  return headings;
}

/**
 * URLのホスト名を取得
 */
export function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

/**
 * YouTubeのURLかを判定
 */
export function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com\/|youtu\.be\/)/.test(url);
}

/**
 * TwitterのURLかを判定
 */
export function isTwitterUrl(url: string): boolean {
  return /(?:twitter\.com|x\.com)\//.test(url);
}

/**
 * InstagramのURLかを判定
 */
export function isInstagramUrl(url: string): boolean {
  return /instagram\.com\//.test(url);
}

/**
 * PinterestのURLかを判定
 */
export function isPinterestUrl(url: string): boolean {
  return /pinterest\.com\//.test(url);
}

/**
 * GitHubのURLかを判定
 */
export function isGitHubUrl(url: string): boolean {
  return /github\.com\//.test(url);
}

/**
 * CodePenのURLかを判定
 */
export function isCodePenUrl(url: string): boolean {
  return /codepen\.io\//.test(url);
}

/**
 * AmazonのURLかを判定
 */
export function isAmazonUrl(url: string): boolean {
  return /amazon\.[a-z.]+\//.test(url);
}

/**
 * YouTubeの動画IDを抽出
 */
export function extractYouTubeVideoId(url: string): string | null {
  const match =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/) ||
    url.match(/youtube\.com\/embed\/([^&\n?#]+)/);
  return match ? match[1] : null;
}

/**
 * テキストの要約を生成（最大文字数で切り詰め）
 */
export function truncate(text: string, maxLength: number = 160, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * URLパラメータから検索クエリを生成
 */
export function buildSearchQuery(query: string): string {
  return new URLSearchParams({ q: query }).toString();
}

/**
 * 配列を複数の小さな配列に分割
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * 重複を除去してソート
 */
export function uniqueSort(items: string[]): string[] {
  return Array.from(new Set(items)).sort();
}

/**
 * テキストをスラグに変換
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * HTMLエスケープ
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * 正規表現をエスケープ
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 複数のURLを含むテキストからURLを抽出
 */
export function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  return matches || [];
}

/**
 * オブジェクトをクエリ文字列に変換
 */
export function objectToQueryString(obj: Record<string, any>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      params.append(key, String(value));
    }
  }
  return params.toString();
}

/**
 * クエリ文字列をオブジェクトに変換
 */
export function queryStringToObject(queryString: string): Record<string, string> {
  const obj: Record<string, string> = {};
  const params = new URLSearchParams(queryString);
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
