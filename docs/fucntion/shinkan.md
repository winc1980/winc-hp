# サークルHP Instagram投稿連携システム 仕様書 (Draft)

## 1. 概要

サークルの公式Instagramアカウントに投稿されたメディア（画像・動画）およびキャプションを自動的に取得し、サークルHP（Next.js）上でレイアウトして表示するシステム。
外部依存によるフロントエンドのパフォーマンス低下と、Instagram Graph APIの不安定さ（トークン切れ、URL期限切れ）を隠蔽するため、microCMSを中間データストアとして活用する。

## 2. システムアーキテクチャ

採用アーキテクチャ：非同期バッチ同期モデル

```
graph TD
User((Client)) -->|Visit Site| CF_Pages[Cloudflare Pages / Next.js]
CF_Pages -->|Fetch SSG/ISR| CMS[microCMS API]
```

    subgraph "Sync System (Cloudflare Workers)"
        Cron[Cron Triggers\nEvery 6-12 hours] --> Worker[Sync Worker]
        Worker -->|1. Fetch Posts| Insta[Instagram Graph API]
        Worker -->|2. Upload Media & Text| CMS_Mgmt[microCMS Management API]
        Worker -->|3. Refresh Token| Insta
        Worker -->|4. Error Alert| Discord[Discord Webhook]
    end

## 3. 機能要件詳細

### 3.1. Instagramデータ取得 (Cloudflare Workers)

- 対象API: Instagram Graph API (Basic Display APIは2024年12月に廃止されたため、Graph API + Instagramプロアカウント/クリエイターアカウントが必須)。

- トリガー: Cloudflare WorkersのCron Triggers。API制限を考慮し、6時間〜12時間に1回の実行とする。

- 取得対象: フィード投稿（画像、カルーセル、リール）。ストーリーズは揮発性が高いため対象外。

- マッピングデータ:
  - id (Instagram Media ID - ユニークキー)

  - media_type (IMAGE / VIDEO / CAROUSEL_ALBUM)

  - media_url (メディアの一時URL)

  - thumbnail_url (Videoの場合のサムネイル)

  - caption (投稿テキスト)

  - permalink (Instagram上の元投稿URL)

  - timestamp (投稿日時)

### 3.2. データ永続化・ホスティング (microCMS)

メディアの再ホスティング (最重要事項): Graph APIから取得できる media_url はCDNの仕様上、数日で有効期限が切れる（URL署名がExpireする）。そのため、Workerは取得したURLから実体をダウンロード（fetch）し、microCMSのメディアストレージ（またはCloudflare R2）へ再アップロードする処理を必ず行う。

差分更新ロジック: 毎回全件取得・更新するのは非効率なため、取得した投稿の id をmicroCMSに問い合わせ、存在しない新規投稿のみをアップロードする。

### 3.3. アクセストークン管理

Graph APIの「長期アクセストークン（有効期限60日）」を利用。

Sync Workerの処理の最後に、残りの有効期限を判定し、必要に応じてトークンリフレッシュAPIを叩く。

最新のトークンはCloudflare WorkersのSecrets（環境変数）を自動で上書きする、あるいはCloudflare KVに保持して参照する。

### 3.4. フロントエンド (Next.js)

表示ロジック: Instagram APIとは一切通信せず、microCMSからデータを取得して描画する（SSG / ISR推奨）。

UI/UX: カルセール形式の場合は先頭の画像のみを表示するか、Next.js側でスライダーを実装する。

## 4. アーキテクチャに対する批判的検討（反論と対策）

本設計に対する潜在的なリスクと、それらへの反駁・対策を定義する。

### 批判A: 「バッチ処理と再ホスティングはオーバーエンジニアリングではないか？」

【指摘】
フロントエンドから直接APIを叩くか、サードパーティのウィジェット（SnapWidgetなど）を埋め込む方が、実装コストと保守コストが圧倒的に低い。

【反駁と対策】

サードパーティウィジェットはカスタマイズ性が低く、「いい感じにレイアウト」するという要件を満たせない。

クライアントサイドでのAPI直接実行は、アクセストークンの漏洩リスク（重大なセキュリティホール）に直結する。

結論: メディアURLの期限切れ問題が存在する以上、中間層での再ホスティング処理は「オーバーエンジニアリング」ではなく「必須要件」である。

### 批判B: 「microCMSの無料枠（リソース）を使い潰すリスク」

【指摘】
Hobbyプラン（無料）の場合、データ転送量やストレージ容量（20GB程度）、API呼び出し回数に上限がある。高画質な画像や動画を頻繁に同期すると、すぐに上限に達しサイトが停止する。

【反駁と対策】

対策1: 同期する投稿数を「最新の12件」などに制限する。Sync Worker内で、microCMS上の古い投稿（13件目以降）を削除するガベージコレクション処理を実装する。

対策2: 動画（リール）本体は重すぎるため、動画の場合は thumbnail_url のみを取得・保存し、クリック時はInstagramの permalink へ遷移させる仕様にダウングレードする。

### 批判C: 「MetaのAPI仕様変更への追従コスト」

【指摘】
MetaのAPIは非常に不安定であり、突然の仕様変更やアプリレビューの再要求が発生する。サークルという代替わりが発生する組織で、これを永続的に保守できるのか？

【反駁と対策】

これが本システム最大のウィークポイントである。

対策1（フェイルセーフ）: Sync Workerがエラーを吐き続けて同期が止まっても、サークルHP自体は落ちない設計にする（microCMSのキャッシュデータで表示され続ける）。

対策2（監視）: Cloudflare WorkersからDiscord等のWebhookへエラー通知を飛ばし、保守担当者がすぐに異常を検知できるようにする。

## 5. ネクストアクション

実装フェーズに向けて、以下の順序で検証を進めることを推奨する。

1. APIの疎通確認・権限取得 (最優先):

- Meta for Developersにてアプリを作成。

- サークルのInstagramアカウントをプロアカウント化し、Facebookページと連携。

- Graph API Explorerを用いて、手動でアクセストークンを取得し、JSONデータが返ってくるか確認する。

2. microCMSスキーマ定義:

   同期対象のデータを格納するAPIスキーマを作成する。

3. Sync Worker (プロトタイプ) の実装:

   取得とmicroCMSへの書き込み部分をCloudflare Workersで実装し、ローカル（Wrangler）でテストする
