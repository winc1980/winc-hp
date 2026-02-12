import type { NotionColor } from "./types";

// Format date to Japanese locale string
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Map Notion color to Tailwind class
export function getColorClass(color: NotionColor): string {
  const colorMap: Record<NotionColor, string> = {
    default: "",
    gray: "text-gray-500",
    brown: "text-amber-700",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
    green: "text-green-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    pink: "text-pink-500",
    red: "text-red-500",
    gray_background: "bg-gray-100",
    brown_background: "bg-amber-50",
    orange_background: "bg-orange-50",
    yellow_background: "bg-yellow-50",
    green_background: "bg-green-50",
    blue_background: "bg-blue-50",
    purple_background: "bg-purple-50",
    pink_background: "bg-pink-50",
    red_background: "bg-red-50",
  };
  return colorMap[color] || "";
}

// Map Notion tag color to CSS classes
export function getTagColorClass(color: string): string {
  const tagColors: Record<string, string> = {
    default: "bg-foreground/10 text-foreground",
    gray: "bg-gray-200 text-gray-700",
    brown: "bg-amber-100 text-amber-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    red: "bg-red-100 text-red-800",
  };
  return tagColors[color] || tagColors.default;
}

// Get image URL from Notion file object
export function getNotionFileUrl(
  file: { type: "external"; external: { url: string } } | { type: "file"; file: { url: string } }
): string {
  if (file.type === "external") return file.external.url;
  return file.file.url;
}
