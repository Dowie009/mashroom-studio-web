# 📋 今日のロードマップ - ブログ管理システム構築

**最終目標**: オリジナルアプリから各ページにコンテンツをアップロードし、サーバーに反映させる

---

## 🎯 実装の順序（推奨）

### ステップ1️⃣: データ構造とAPI設計を確定する
**担当: あなた本人（意思決定が必要）**

- [ ] サムネイル画像のレイアウト（横長・縦長・正方形）をどのページで使うか決める
- [ ] 各ページ（works, gear, lesson, price, profile）で必要なデータ項目を決める
  - 例: works → プロジェクト名、説明、画像、カテゴリー、日付
  - 例: gear → 機材名、型番、画像、説明、購入年
- [ ] 画像の保存先フォルダ構成を決める（例: `public/images/works/`, `public/images/gear/`）
- [ ] データ保存方法を決める（JSON、Markdown、CMS、Database）

**⏱️ 所要時間**: 30分〜1時間（各ページで何を見せたいか整理する）

---

### ステップ2️⃣: バックエンドAPIを実装する
**担当: Claude Code（自動化可能）🤖**

#### 2-1. APIエンドポイントを作成
```
src/pages/api/
├── works/
│   ├── create.ts      # 作品を追加
│   ├── update.ts      # 作品を更新
│   ├── delete.ts      # 作品を削除
│   └── list.ts        # 作品一覧取得
├── gear/
│   ├── create.ts
│   ├── update.ts
│   └── list.ts
├── lesson/
│   └── ...
└── upload.ts          # 画像アップロード共通API
```

#### 2-2. データストレージを実装
- JSONファイル方式（シンプル、サーバー不要）
  - `src/data/works.json`
  - `src/data/gear.json`
  - など
- または、Markdown + Frontmatter方式

#### 2-3. TypeScript型定義を作成
```typescript
// src/types/content.ts
export type ThumbnailLayout = 'landscape' | 'portrait' | 'square';

export interface Work {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    layout: ThumbnailLayout;
  };
  images: string[];
  date: string;
  category: string;
}
```

**🤖 Claude Codeができること**:
- ✅ APIエンドポイントのファイル自動生成
- ✅ TypeScript型定義の作成
- ✅ JSONスキーマのバリデーション実装
- ✅ 画像アップロード処理（サイズ制限、形式チェック）
- ✅ CRUD操作のロジック実装

---

### ステップ3️⃣: 既存ページとデータ連携させる
**担当: Claude Code（自動化可能）🤖 + Cursor（コード補完）⚡**

#### 3-1. 各ページをデータ駆動に変更

**現状**: `works.astro` に直接HTMLが書かれている
**変更後**: JSONデータから動的に生成

```astro
---
// works.astro
import type { Work } from '../types/content';
const works: Work[] = await fetch('/api/works/list').then(r => r.json());
---

<div class="works-grid">
  {works.map(work => (
    <article class={`work-item ${work.thumbnail.layout}`}>
      <img src={work.thumbnail.url} alt={work.title} />
      <h3>{work.title}</h3>
      <p>{work.description}</p>
    </article>
  ))}
</div>
```

#### 3-2. レイアウトパターンをCSSで実装

```css
.work-item.landscape { aspect-ratio: 16/9; }
.work-item.portrait { aspect-ratio: 3/4; }
.work-item.square { aspect-ratio: 1/1; }
```

**🤖 Claude Codeができること**:
- ✅ 既存ページの構造を解析
- ✅ データ駆動型に自動リファクタリング
- ✅ CSSグリッドレイアウトの実装
- ✅ レスポンシブ対応

**⚡ Cursorが得意なこと**:
- ⚡ コンポーネントの細かいスタイル調整
- ⚡ 既存デザインを保ちながらのリファクタリング

---

### ステップ4️⃣: オリジナルアプリ（管理画面）を実装する
**担当: あなた本人（UI/UXの判断）+ Cursor（コード生成）⚡**

#### 4-1. 技術スタック選定（あなたが決める）
- React + Vite
- Next.js
- Vue.js
- Svelte
- ネイティブアプリ（React Native / Flutter）

#### 4-2. 管理画面のUI設計（あなたが決める）
```
管理画面のページ構成:
├── ログイン画面
├── ダッシュボード
│   ├── 作品管理（Works）
│   ├── 機材管理（Gear）
│   ├── レッスン管理（Lesson）
│   ├── 料金管理（Price）
│   └── プロフィール管理（Profile）
└── 画像アップロード
    └── レイアウト選択UI
```

#### 4-3. アップロードUIの実装

```tsx
// サムネイル選択コンポーネント（例）
function ThumbnailUploader() {
  const [layout, setLayout] = useState<ThumbnailLayout>('landscape');

  return (
    <div>
      <div className="layout-selector">
        <button onClick={() => setLayout('landscape')}>
          横長 (16:9)
        </button>
        <button onClick={() => setLayout('portrait')}>
          縦長 (3:4)
        </button>
        <button onClick={() => setLayout('square')}>
          正方形 (1:1)
        </button>
      </div>

      <ImageUpload
        aspectRatio={layout === 'landscape' ? '16:9' : layout === 'portrait' ? '3:4' : '1:1'}
        onUpload={(file) => handleUpload(file, layout)}
      />

      <Preview layout={layout} />
    </div>
  );
}
```

**⚡ Cursorができること**:
- ⚡ React/Next.jsのボイラープレート生成
- ⚡ フォームコンポーネントの自動生成
- ⚡ 画像プレビュー機能の実装
- ⚡ ドラッグ&ドロップUIの実装

**🧑 あなた本人がやること**:
- 🧑 UIデザインの最終決定
- 🧑 レイアウトパターンの組み合わせ方針
- 🧑 実際の写真・コンテンツの準備とアップロード

---

### ステップ5️⃣: サーバーデプロイ設定
**担当: Claude Code（自動化可能）🤖 + あなた本人（認証情報）🧑**

#### 5-1. デプロイ先を決める（あなたが決める）
- Vercel（推奨: Astroとの相性抜群）
- Netlify
- Cloudflare Pages
- GitHub Pages

#### 5-2. デプロイ設定を自動化

**🤖 Claude Codeができること**:
- ✅ `vercel.json` / `netlify.toml` の自動生成
- ✅ ビルドスクリプトの最適化
- ✅ 環境変数の設定ガイド作成
- ✅ GitHub Actionsでの自動デプロイ設定

**🧑 あなた本人がやること**:
- 🧑 デプロイサービスのアカウント作成
- 🧑 APIキーや認証情報の入力
- 🧑 独自ドメインの設定（必要な場合）
- 🧑 最初のデプロイボタンを押す

---

## 📊 作業配分の目安

### 🤖 Claude Code（自動化可能）: 約60%
- APIエンドポイント作成
- TypeScript型定義
- データ構造の実装
- 既存ページのリファクタリング
- CSSレイアウト実装
- デプロイ設定ファイル生成

### ⚡ Cursor（コード補完が便利）: 約20%
- 管理画面のReact/Next.js実装
- フォームコンポーネント
- 画像アップロードUI
- プレビュー機能

### 🧑 あなた本人（絶対に必要）: 約20%
- データ構造の意思決定
- UIデザインの最終判断
- レイアウトパターンの選択
- 実際のコンテンツ準備・アップロード
- デプロイサービスの認証情報入力
- テスト・確認作業

---

## 🚀 今日やること（推奨スケジュール）

### 午前（2-3時間）
1. **あなた**: データ構造を決める（30分）
2. **Claude Code**: APIとTypeScript型を実装（1時間）
3. **Claude Code**: 既存ページをデータ駆動に変更（1時間）

### 午後（2-3時間）
4. **あなた + Cursor**: 管理画面のベース実装（2時間）
5. **Claude Code**: デプロイ設定（30分）
6. **あなた**: 初回デプロイ・動作確認（30分）

---

## 💡 重要なポイント

### ✅ Claude Codeに任せられること
- コードの自動生成・リファクタリング
- API設計・実装
- 型定義とバリデーション
- デプロイ設定ファイル作成
- 既存コードの解析と改善提案

### ✅ Cursorが得意なこと
- React/Vueコンポーネントの生成
- フォーム・UI部品の実装
- スタイル調整
- コード補完による高速開発

### ✅ あなた本人がやるべきこと
- **意思決定**: どんなデータ構造にするか
- **デザイン判断**: UIの見た目・レイアウト
- **コンテンツ準備**: 実際の画像・テキスト
- **認証情報**: APIキー、パスワードなどの入力
- **最終確認**: 動作テスト、デプロイ承認

---

## 🎯 最初に決めること（今すぐ！）

1. **データ保存方法**: JSON vs Markdown vs CMS？
   - 推奨: JSON（シンプル、Claude Codeで完全自動化可能）

2. **管理画面の技術**: React vs Next.js vs Vue？
   - 推奨: Next.js（API Routesも使える、Vercelデプロイ簡単）

3. **画像保存先**: ローカル vs クラウドストレージ？
   - 推奨: まずローカル（`public/images/`）、後でCloudinary等に移行可能

これらを決めたら、すぐにClaude Codeでステップ2から自動実装開始できます！

---

## 📝 次のアクション

このロードマップを読んだら、次のように指示してください:

```
「ステップ1のデータ構造、こんな感じで進めたい:
- データ保存: JSON方式
- 管理画面: Next.js
- 画像: public/images/に保存
- worksページから始める」
```

そうすれば、Claude Codeがすぐにステップ2の実装を開始します！🚀
