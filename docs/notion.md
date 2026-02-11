# ブログ機能（Notion連携）アーキテクチャ

このドキュメントでは、Notion APIと連携したブログ機能の構成を説明します。
別プロジェクトへの移行時の参考資料として利用してください。

---

## データフローの全体像

```
Notion Database (API)
    │
    ▼
src/lib/notion/client.ts （データ取得・変換）
    │
    ▼
Astroビルド時に画像ダウンロード（src/integrations/）
    │
    ▼
ページ生成（src/pages/posts/）
    │
    ▼
コンポーネント描画（NotionBlocks → 各ブロックコンポーネント）
    │
    ▼
HTML出力
```

---

## 1. Notion API 接続（コア）

| ファイル                      | 役割                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| `src/lib/notion/client.ts`    | Notion APIクライアント本体。投稿取得、ブロック取得、著者取得、画像DLなど全ての通信処理 |
| `src/lib/notion/responses.ts` | Notion APIレスポンスのTypeScript型定義                                                 |
| `src/lib/interfaces.ts`       | アプリ内で使うPost, Block等のデータ型定義                                              |

### client.ts の主要メソッド

- `getAllPosts()` - 全投稿を取得（Published=true、公開日が今日以前のもの）
- `getPosts(number)` - 指定件数の投稿を取得
- `getPostBySlug(slug)` - スラッグで個別記事を取得
- `getPostsByTag(tag, number)` - タグ別投稿を取得
- `getPostsByPage(page)` - ページネーション付き投稿取得
- `getAllBlocksByBlockId(blockId)` - 記事のブロック（本文）を全取得
- `getBlock(blockId)` - 個別ブロック取得
- `getAllTags()` - 全タグ取得
- `getAuthors()` - 著者情報を取得（DATABASE_ID_2 から）
- `downloadFile(url)` - 画像・ファイルのダウンロード（EXIFストリップ、JPEG自動回転対応）

---

## 2. 設定

| ファイル                  | 役割                                                                              |
| ------------------------- | --------------------------------------------------------------------------------- |
| `src/server-constants.ts` | `NOTION_API_SECRET`, `DATABASE_ID`（投稿用）, `DATABASE_ID_2`（著者用）などの定数 |
| `astro.config.mjs`        | Astro設定。画像DL用のカスタムintegration登録                                      |

### 必要な環境変数・定数

- `NOTION_API_SECRET` - Notion APIの認証キー
- `DATABASE_ID` - ブログ投稿用のNotionデータベースID
- `DATABASE_ID_2` - 著者情報用のNotionデータベースID
- `CUSTOM_DOMAIN` - カスタムドメイン
- `BASE_PATH` - ベースパス
- `PUBLIC_GA_TRACKING_ID` - Google AnalyticsのトラッキングID
- `REQUEST_TIMEOUT_MS` - APIリクエストのタイムアウト
- `ENABLE_LIGHTBOX` - ライトボックス機能の有効/無効

---

## 3. ビルド時スクリプト

| ファイル                              | 役割                                                               |
| ------------------------------------- | ------------------------------------------------------------------ |
| `scripts/blog-contents-cache.cjs`     | ビルド前にNotionからブロックデータを一括取得し `tmp/` にキャッシュ |
| `scripts/retrieve-block-children.cjs` | 個別ページのブロック子要素を取得・キャッシュ                       |

---

## 4. ユーティリティ

| ファイル                  | 役割                                                              |
| ------------------------- | ----------------------------------------------------------------- |
| `src/lib/blog-helpers.ts` | URL生成、ブロック抽出、外部コンテンツ埋め込み、日付フォーマット等 |

### blog-helpers.ts の主な機能

- `filePath(path)` - ファイルパス生成
- `getPostLink(slug)` - 記事URLの生成
- `getTagLink(tag)` - タグページURLの生成
- `getPageLink(page)` - ページネーションURLの生成
- `extractTargetBlocks(blockType, blocks)` - 再帰的に特定ブロック型を抽出
- `buildURLToHTMLMap(urls)` - 外部コンテンツ（Bookmark等）のHTML取得・キャッシュ
- YouTube, Twitter, Instagram, Pinterest, CodePen, AmazonのURL検出

---

## 5. ページ（ルーティング）

| ファイル                                      | 役割                     |
| --------------------------------------------- | ------------------------ |
| `src/pages/posts/index.astro`                 | ブログ一覧ページ         |
| `src/pages/posts/[slug].astro`                | 個別記事ページ（メイン） |
| `src/pages/posts/tag/[tag].astro`             | タグ別一覧               |
| `src/pages/posts/page/[page].astro`           | ページネーション         |
| `src/pages/posts/tag/[tag]/page/[page].astro` | タグ別ページネーション   |

---

## 6. レイアウト

| ファイル                          | 役割                                             |
| --------------------------------- | ------------------------------------------------ |
| `src/layouts/BlogLayout.astro`    | 記事ページのレイアウト（OGP、TOC、サイドバー等） |
| `src/layouts/BlogTopLayout.astro` | ブログ一覧のレイアウト                           |

---

## 7. Notionブロック描画コンポーネント

| ファイル                                    | 役割                                                                               |
| ------------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/components/NotionBlocks.astro`         | **メインのオーケストレーター**。ブロック種別ごとに適切なコンポーネントを呼び分ける |
| `src/components/notion-blocks/`             | 各ブロック型のコンポーネント群（下記参照）                                         |
| `src/components/notion-blocks/annotations/` | テキスト装飾コンポーネント                                                         |

### notion-blocks/ 内のコンポーネント一覧

| コンポーネント            | 対応するNotionブロック                                |
| ------------------------- | ----------------------------------------------------- |
| `Paragraph.astro`         | テキスト段落                                          |
| `Heading1.astro`          | 見出し1                                               |
| `Heading2.astro`          | 見出し2                                               |
| `Heading3.astro`          | 見出し3                                               |
| `Image.astro`             | 画像（キャプション、ライトボックス対応）              |
| `Video.astro`             | 動画埋め込み                                          |
| `Code.astro`              | コードブロック（PrismJSによるシンタックスハイライト） |
| `Quote.astro`             | 引用                                                  |
| `Equation.astro`          | 数式（KaTeX）                                         |
| `Callout.astro`           | コールアウトボックス                                  |
| `Embed.astro`             | 埋め込みコンテンツ（YouTube, Twitter等）              |
| `Bookmark.astro`          | リンクプレビュー                                      |
| `File.astro`              | ファイルダウンロード                                  |
| `Table.astro`             | テーブル                                              |
| `ColumnList.astro`        | 複数カラムレイアウト                                  |
| `BulletedListItems.astro` | 箇条書きリスト                                        |
| `NumberedListItems.astro` | 番号付きリスト                                        |
| `ToDo.astro`              | チェックボックス                                      |
| `Toggle.astro`            | トグル（折りたたみ）                                  |
| `TableOfContents.astro`   | 目次                                                  |
| `LinkToPage.astro`        | Notion内部ページリンク                                |
| `Divider.astro`           | 区切り線                                              |

### annotations/ 内のコンポーネント一覧

| コンポーネント        | 役割             |
| --------------------- | ---------------- |
| `Bold.astro`          | 太字             |
| `Italic.astro`        | 斜体             |
| `Strikethrough.astro` | 取り消し線       |
| `Underline.astro`     | 下線             |
| `Code.astro`          | インラインコード |
| `Color.astro`         | カラーテキスト   |
| `Anchor.astro`        | リンク           |

---

## 8. ブログUI部品コンポーネント

| ファイル                                 | 役割                               |
| ---------------------------------------- | ---------------------------------- |
| `src/components/PostTitle.astro`         | 記事タイトル                       |
| `src/components/PostDate.astro`          | 投稿日                             |
| `src/components/PostTags.astro`          | タグ表示                           |
| `src/components/PostFeaturedImage.astro` | アイキャッチ画像                   |
| `src/components/PostExcerpt.astro`       | 記事の抜粋                         |
| `src/components/PostBody.astro`          | 記事本文（NotionBlocksのラッパー） |
| `src/components/PostRelativeLink.astro`  | 前後の記事リンク                   |
| `src/components/Author.astro`            | 著者プロフィール表示               |
| `src/components/BlogPostsLink.astro`     | サイドバー用の記事リスト           |
| `src/components/BlogTagsLink.astro`      | サイドバー用のタグリスト           |
| `src/components/Toc.astro`               | 目次                               |

---

## 9. ビルド時画像ダウンロード（Astro Integrations）

| ファイル                                        | 役割                           |
| ----------------------------------------------- | ------------------------------ |
| `src/integrations/featured-image-downloader.ts` | アイキャッチ画像をローカルにDL |
| `src/integrations/author-image-downloader.ts`   | 著者画像をDL                   |
| `src/integrations/cover-image-downloader.ts`    | DBカバー画像をDL               |
| `src/integrations/custom-icon-downloader.ts`    | DBアイコンをDL                 |
| `src/integrations/public-notion-copier.ts`      | DLした画像をビルド出力にコピー |

---

## 10. スタイル

| ファイル                      | 役割                     |
| ----------------------------- | ------------------------ |
| `src/scss/blog.scss`          | ブログ用スタイル         |
| `src/scss/blogpage.scss`      | ブログページレイアウト用 |
| `src/styles/notion-color.css` | Notionカラーパレット     |
| `src/styles/blog.module.css`  | ブログ用CSSモジュール    |

---

## 移行時のチェックリスト

### 必須ファイル

- [ ] `src/lib/notion/client.ts` - API接続
- [ ] `src/lib/notion/responses.ts` - 型定義
- [ ] `src/lib/interfaces.ts` - データ型
- [ ] `src/lib/blog-helpers.ts` - ユーティリティ
- [ ] `src/server-constants.ts` - 設定定数
- [ ] `src/components/NotionBlocks.astro` - ブロック描画オーケストレーター
- [ ] `src/components/notion-blocks/` - 全ブロックコンポーネント
- [ ] `src/pages/posts/` - 全ページファイル
- [ ] `src/layouts/BlogLayout.astro` - レイアウト
- [ ] `src/layouts/BlogTopLayout.astro` - レイアウト

### 推奨ファイル

- [ ] `src/integrations/` - 画像最適化
- [ ] `scripts/` - ビルドキャッシュ
- [ ] スタイル関連ファイル

### npm依存パッケージ（package.jsonから確認）

- [ ] `@notionhq/client` - Notion公式SDKクライアント
- [ ] `prismjs` - シンタックスハイライト
- [ ] `katex` - 数式レンダリング
- [ ] `sharp` - 画像処理（EXIF, リサイズ等）
- [ ] その他、`package.json` の `dependencies` を確認

### 環境設定

- [ ] Notion APIインテグレーションの作成
- [ ] `NOTION_API_SECRET` の設定
- [ ] `DATABASE_ID` / `DATABASE_ID_2` の設定
- [ ] Notionデータベースの共有設定（インテグレーションへのアクセス許可）
