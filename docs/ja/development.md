# 開発ガイド

このガイドでは、Create.xyz Mobileを使用してモバイルアプリケーションを開発する方法を説明します。

## Create.xyzアプリの変換

### 1. プロジェクトのセットアップ

1. Create.xyzコンポーネントの準備：
```bash
src/
├── components/    # コンポーネントをここにコピー
├── pages/         # ページをここにコピー
└── App.jsx       # ルートの更新
```

2. 必要に応じて依存関係を更新：
```json
{
  "dependencies": {
    // 既存の依存関係
    "@capacitor/core": "^5.0.0",
    "@capacitor/android": "^5.0.0"
  }
}
```

### 2. モバイル対応

1. モバイル固有の機能を追加：
```javascript
import { Capacitor } from '@capacitor/core';

// プラットフォームの確認
const isPlatform = (platform) => {
  return Capacitor.getPlatform() === platform;
};

// ネイティブ機能の使用
if (isPlatform('android')) {
  // Android固有のコード
}
```

2. デバイス機能の処理：
- バックボタン
- 画面の向き
- ステータスバー
- ディープリンク

### 3. テスト

1. Webテスト：
```bash
npm run dev
```

2. Androidテスト：
```bash
npm run android
```

### 4. プロダクションビルド

1. Webアセットのビルド：
```bash
npm run build
```

2. ネイティブプロジェクトの同期：
```bash
npx cap sync
```

3. IDEで開く：
```bash
npx cap open android
```

## ベストプラクティス

1. **レスポンシブデザイン**
   - 相対単位を使用
   - 異なる画面サイズでテスト
   - 適切なタッチターゲットの実装

2. **パフォーマンス**
   - 画像の最適化
   - 遅延読み込みの実装
   - 適切なキャッシュ戦略

3. **ネイティブ機能**
   - プラットフォームの可用性確認
   - Web用フォールバックの提供
   - 適切な権限の処理

## デバッグ

1. Webデバッグ：
   - Chrome DevTools
   - React Developer Tools

2. ネイティブデバッグ：
   - Android Studioデバッガー
   - AndroidのLogcat

## デプロイ

1. Android：
   - 署名付きAPKの生成
   - ストアリストの準備
   - Play Storeへの提出
