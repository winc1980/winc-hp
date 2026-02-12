// 技術名から public/icons/technology/ 内のアイコンファイルへのマッピング
const ICON_MAP: Record<string, string> = {
  "HTML/CSS": "/icons/technology/html.webp",
  JavaScript: "/icons/technology/javascript.webp",
  TypeScript: "/icons/technology/typescirpt.webp",
  Flutter: "/icons/technology/flutter.jpg",
  React: "/icons/technology/react.png",
  "React Native": "/icons/technology/react-native.svg",
  "Next.js": "/icons/technology/nextjs.png",
  Supabase: "/icons/technology/supabase.webp",
  Firebase: "/icons/technology/firebase.jpg",
  AWS: "/icons/technology/aws.png",
  "Word Press": "/icons/technology/wordpress.png",
  microCMS: "/icons/technology/microCMS.svg",
};

export function getTechnologyIcon(name: string): string | null {
  return ICON_MAP[name] ?? null;
}
