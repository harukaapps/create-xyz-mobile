# Create.xyz Mobile

[English](./README.md) | 日本語

[Create.xyz](https://create.xyz)で作成したアプリケーションを、設定不要でモバイルアプリに変換できます。Create.xyzは、あなたの言葉をコードでサイト、コンポーネント、ツールに変換します。このプロジェクトは、その機能をCapacitorを使用してネイティブモバイルプラットフォームに拡張します。

## 特徴

- 🔄 Create.xyzアプリを直接モバイルアプリに変換
- 📱 Capacitorによるネイティブモバイル機能
- 🚀 設定不要で即座に使用可能
- ⚡️ 同じコンポーネントとロジックを使用
- 🎨 Create.xyzのデザインを保持
- 🛠 効率的な開発ワークフロー
- 📦 簡単なデプロイメントプロセス

## なぜCreate.xyz Mobileか？

Create.xyz Mobileを使用すると、Create.xyzで作成したテキストからアプリへの創作物をネイティブモバイルアプリケーションに変換できます。新しいフレームワークを学んだり、アプリケーションを書き直したりする必要はありません - Create.xyzで生成されたコンポーネントがモバイルでもシームレスに動作します。

## 使用技術

- React 18
- Capacitor 5
- Tailwind CSS 3
- Vite 5
- ESLint & Prettier（コードフォーマット用）

## はじめ方

### 必要条件

- Node.js (v16以上)
- npm または yarn
- Android Studio (Android開発用)
- Xcode (iOS開発用、Macのみ)

### インストール

1. リポジトリのクローン
```bash
git clone https://github.com/harukaapps/create-xyz-mobile.git
cd create-xyz-mobile
```

2. 依存関係のインストール
```bash
npm install
```

3. Capacitorの初期化
```bash
npx cap init [アプリ名] [アプリID]
# 例: npx cap init "My App" com.example.app
```

4. プラットフォーム固有の依存関係をインストール
```bash
# Androidの場合
npm install @capacitor/android
npx cap add android

# iOSの場合（Macのみ）
npm install @capacitor/ios
npx cap add ios
```

5. 開発サーバーの起動
```bash
npm run dev
```

### Create.xyzアプリの変換

1. Create.xyzのReactコンポーネントを`src/components`ディレクトリにコピー
2. `src/App.jsx`のルートを更新
3. 開発サーバーでアプリをテスト
4. モバイルプラットフォーム用にビルド

### Android開発環境のセットアップ

1. [公式サイト](https://developer.android.com/studio)からAndroid Studioをインストール

2. Android Studioを通じて以下をインストール：
   - Android SDK
   - Android SDKプラットフォーム
   - Android Virtual Device

3. 環境変数の設定：
```bash
# Windowsの場合
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools"

# macOS/Linuxの場合
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

4. Android Studio でAndroid Virtual Device (AVD)を作成：
   - Android Studioを開く
   - "ツール" > "デバイスマネージャー" をクリック
   - "デバイスの作成" をクリック
   - デバイス定義とシステムイメージを選択

### モバイル用ビルド

#### Android
```bash
npm run build
npx cap sync android
npx cap open android
```

## 開発

### 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクション用ビルド
- `npm run preview` - プロダクションビルドのプレビュー
- `npm run lint` - ESLintの実行
- `npm run format` - Prettierでのコードフォーマット
- `npm run android` - ビルドしてAndroid Studioで開く

### アプリアイコンのカスタマイズ

このプロジェクトにはSVGファイルからAndroidアプリのアイコンを生成するユーティリティスクリプトが含まれています。デフォルトのアイコンはすでに生成されていますが、カスタマイズする場合は：

1. `icon.svg`を自分のアイコンに置き換え
2. 必要なパッケージをインストール: `npm install sharp`
3. 実行: `node generate-icons.js`

これにより、Androidに必要な各サイズのアイコンが生成されます：
- ランチャーアイコン（48x48から192x192）
- 丸型アイコン
- アダプティブアイコン（フォアグラウンドレイヤー付き）

## ライセンス

このプロジェクトはMITライセンスの下で公開されています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

### サードパーティライセンス

このプロジェクトは以下のオープンソースパッケージを使用しています：

- [React](https://github.com/facebook/react) - MITライセンス
- [Capacitor](https://github.com/ionic-team/capacitor) - MITライセンス
- [Vite](https://github.com/vitejs/vite) - MITライセンス
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - MITライセンス

## 謝辞

- [Create.xyz](https://create.xyz)チーム - テキストからアプリ開発の先駆者
- Reactチーム - 素晴らしいフレームワークの提供
- Capacitorチーム - ネイティブモバイル開発の実現
- このプロジェクトの改善に貢献してくださる全ての方々

注意：このプロジェクトはAIツールの支援を受けて開発されました。
一部のコードはAIによって生成され、その後著者によってレビュー・修正されています。
