# インストールガイド

このガイドでは、Create.xyz Mobileのセットアップと開発環境の準備方法について説明します。

## 前提条件

開始する前に、以下がインストールされていることを確認してください：

- Node.js (v16以上)
- npm または yarn
- Android Studio (Android開発用)
- Xcode (iOS開発用、Macのみ)

## インストール手順

1. リポジトリのクローン：
```bash
git clone https://github.com/harukaapps/create-xyz-mobile.git
cd create-xyz-mobile
```

2. 依存関係のインストール：
```bash
npm install
```

3. 開発環境のセットアップ：
```bash
# Android用
npm run android
```

## 環境設定

### Android開発

1. Android Studioのインストール
2. Android SDKのインストール
3. Android Virtual Device (AVD)の設定
4. 環境変数の設定：
   - ANDROID_HOME
   - JAVA_HOME

### トラブルシューティング

一般的なインストールの問題：

1. **Nodeバージョンの不一致**
   - 解決策：nvmを使用して正しいバージョンをインストール

2. **Android SDK関連の問題**
   - 解決策：Android StudioでSDKのインストールを確認

3. **ビルドエラー**
   - 解決策：プロジェクトをクリーンしてリビルド
   ```bash
   npm run clean
   npm install
   ```

## 次のステップ

インストールが完了したら、[開発ガイド](./development.md)に進んでCreate.xyzアプリの変換方法を学びましょう。
