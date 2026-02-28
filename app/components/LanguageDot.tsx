import { LANG_COLORS } from "../utils/constants";

export function LanguageDot({ language }: { language: string }) {
  const color = LANG_COLORS[language] ?? "#8b949e";
  return (
    <span
      className="lang-dot"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}
