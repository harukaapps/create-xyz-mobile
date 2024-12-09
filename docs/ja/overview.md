# 概要

Create.xyz Mobileは、Create.xyzで作成したReactアプリケーションを、最小限の設定でネイティブモバイルアプリに変換できるツールです。このガイドでは、プロジェクトの概要と機能について説明します。

## 主な機能

- **直接変換**: Create.xyz Reactアプリをモバイルアプリケーションに変換
- **設定不要**: 複雑な設定は必要ありません
- **ネイティブ機能**: Capacitorを通じてデバイス機能にアクセス
- **コード再利用**: 既存のReactコンポーネントとロジックを使用可能
- **モダンな開発**: 最新のWeb技術を使用

## アーキテクチャ

プロジェクトは以下の技術を使用しています：
- React 18: UIコンポーネント
- Capacitor 5: ネイティブモバイル機能
- Vite: 高速な開発とビルド
- Tailwind CSS: スタイリング

## プロジェクト構造

```
create-xyz-mobile/
├── src/
│   ├── components/    # Reactコンポーネント
│   ├── pages/         # ページコンポーネント
│   ├── hooks/         # カスタムReactフック
│   └── utils/         # ユーティリティ関数
├── android/          # Androidプラットフォームファイル
├── public/           # 静的アセット
└── docs/            # ドキュメント
```

## はじめ方

1. [インストールガイド](./installation.md)
2. [開発ガイド](./development.md)

## ライセンス

このプロジェクトはMITライセンスの下で公開されています - 詳細は[LICENSE](../../LICENSE)ファイルを参照してください。

### サードパーティライセンス

このプロジェクトは以下のオープンソースパッケージを使用しています：

- [React](https://github.com/facebook/react) - MITライセンス
- [Capacitor](https://github.com/ionic-team/capacitor) - MITライセンス
- [Vite](https://github.com/vitejs/vite) - MITライセンス
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - MITライセンス

注意：このプロジェクトはAIツールの支援を受けて開発されました。
一部のコードはAIによって生成され、その後著者によってレビュー・修正されています。

## サポート

問題や質問がある場合は：
1. ドキュメントを確認
2. 既存のGitHub issuesを検索
3. 必要に応じて新しいissueを作成
