# インストールガイド

## 必要条件

- Node.js (v16以上)
- npm または yarn
- Android Studio (Androidビルド用)
- Xcode (iOSビルド用、Macのみ)

## インストール手順

1. リポジトリのクローン
```bash
git clone https://github.com/harukaapps/react-capacitor2.git
cd react-capacitor2
```

2. 依存関係のインストール
```bash
npm install
```

3. 開発サーバーの起動
```bash
npm run dev
```

## モバイルビルド

### Android

1. Androidビルドの準備
```bash
npm run build
npx cap sync android
```

2. Android Studioでプロジェクトを開く
```bash
npx cap open android
```

3. Android Studioからビルドとデプロイを行う

### iOS (Macのみ)

1. iOSビルドの準備
```bash
npm run build
npx cap sync ios
```

2. Xcodeでプロジェクトを開く
```bash
npx cap open ios
```

3. Xcodeからビルドとデプロイを行う
