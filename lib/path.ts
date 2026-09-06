// 静的エクスポート + basePath 環境で public 配下のパスを解決する
export const assetPath = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
