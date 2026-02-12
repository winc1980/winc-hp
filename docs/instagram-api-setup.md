# Instagram Graph API セットアップ手順

Instagram投稿をサークルHPに表示するために必要な、APIの初期設定手順をまとめる。

## 1. Instagramアカウントのプロアカウント化

サークルのInstagramアカウントをプロアカウント（ビジネスまたはクリエイター）に変更する。

1. Instagramアプリを開く
2. プロフィール → 右上のメニュー（≡）→ 設定とアクティビティ
3. 「アカウントの種類とツール」→「プロアカウントに切り替える」
4. カテゴリを選択（「教育」や「コミュニティ」など）
5. 「ビジネス」または「クリエイター」を選択（どちらでもOK）

## 2. Facebookページの作成と連携

Instagram Graph APIを使うにはFacebookページとの連携が必要。

1. [Facebook](https://www.facebook.com/)にログイン（サークル管理用のアカウント推奨）
2. 左メニュー →「ページ」→「新しいページを作成」
3. ページ名（例: サークル名）を入力して作成
4. 作成したFacebookページ → 設定 →「リンク済みのアカウント」
5. 「Instagram」→ サークルのInstagramアカウントをリンク

## 3. Meta for Developers でアプリ作成

1. [Meta for Developers](https://developers.facebook.com/) にアクセス
2. 右上「マイアプリ」→「アプリを作成」
3. ユースケース：「その他」→「次へ」
4. アプリの種類：「ビジネス」を選択
5. アプリ名（例: `winc-instagram-sync`）を入力して作成

## 4. Instagram Graph API の有効化

1. 作成したアプリのダッシュボードを開く
2. 左メニュー →「製品を追加」→「Instagram Graph API」→「設定」
3. 左メニューに「Instagram Graph API」が追加されていることを確認

## 5. アクセストークンの取得

### 5.1. Graph API Explorer でトークン取得

1. [Graph API Explorer](https://developers.facebook.com/tools/explorer/) にアクセス
2. 右上で作成したアプリを選択
3. 「ユーザーアクセストークン」を選択
4. 「アクセス許可を追加」で以下を追加:
   - `instagram_basic`
   - `pages_show_list`
   - `pages_read_engagement`
5. 「アクセストークンを取得」→ Facebookログインして許可
6. 表示されたトークンをコピー（これは短期トークン、有効期限約1時間）

### 5.2. Instagram ビジネスアカウント ID の取得

Graph API Explorer で以下のクエリを実行:

```
GET /me/accounts?fields=instagram_business_account{id,username}
```

レスポンスの `instagram_business_account.id` がWorkerに設定する `INSTAGRAM_USER_ID`。

### 5.3. 動作確認

同じくGraph API Explorer で:

```
GET /{INSTAGRAM_USER_ID}/media?fields=id,media_type,media_url,caption,permalink,timestamp&limit=3
```

投稿データがJSON形式で返ってくれば成功。

### 5.4. 長期トークンへの交換

短期トークンを長期トークン（有効期限60日）に交換する。
ターミナルで以下を実行:

```bash
curl -X GET "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={SHORT_LIVED_TOKEN}"
```

- `{APP_ID}`: アプリの設定 → 基本設定で確認
- `{APP_SECRET}`: 同上（「表示」をクリックして確認）
- `{SHORT_LIVED_TOKEN}`: 5.1で取得したトークン

レスポンスの `access_token` が長期トークン。

## 6. microCMS の Write 権限 API キー作成

1. microCMS管理画面 → 「APIキー」
2. 「追加」→ 名前: `instagram-sync-worker`
3. 権限: `instagram` エンドポイントに対して GET / POST / DELETE を許可
4. APIキーを控える

## 7. Cloudflare Worker へのシークレット設定

Worker ディレクトリで以下のコマンドを実行:

```bash
cd workers/instagram-sync

# Instagram アクセストークン（長期トークン）
npx wrangler secret put INSTAGRAM_ACCESS_TOKEN

# Instagram ユーザー ID
npx wrangler secret put INSTAGRAM_USER_ID

# microCMS ドメイン（例: your-service）
npx wrangler secret put MICROCMS_SERVICE_DOMAIN

# microCMS API キー（Write権限付き）
npx wrangler secret put MICROCMS_API_KEY

# Discord Webhook URL（任意）
npx wrangler secret put DISCORD_WEBHOOK_URL
```

各コマンドを実行すると値の入力を求められるので、対応する値を入力する。

## 8. KV Namespace の作成

```bash
# KV Namespace を作成
npx wrangler kv namespace create TOKEN_STORE

# 出力された id を wrangler.toml の [[kv_namespaces]] に設定
# 例: id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## 9. ローカルでのテスト

ローカル開発時はシークレットの代わりに `.dev.vars` ファイルを使う:

```bash
# workers/instagram-sync/.dev.vars
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token
INSTAGRAM_USER_ID=your_instagram_user_id
MICROCMS_SERVICE_DOMAIN=your_service_domain
MICROCMS_API_KEY=your_write_api_key
```

```bash
# 開発サーバー起動
npm run dev

# 別ターミナルから同期を手動実行
curl http://localhost:8787/__scheduled
```

## 10. デプロイ

```bash
npm run deploy
```

## トラブルシューティング

### トークンが期限切れになった場合

Worker のログに「Instagram API エラー (190)」が出る場合、トークンが失効している。
手順5を再度実行して新しい長期トークンを取得し、`wrangler secret put INSTAGRAM_ACCESS_TOKEN` で更新する。

### microCMS のレート制限に引っかかる場合

microCMS の無料プランでは API 呼び出し回数に制限がある。
Workerの同期間隔（wrangler.toml の crons）を `0 0 * * *`（1日1回）に変更する。
