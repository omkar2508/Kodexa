import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { ui, type UIKey } from "./ui";
import { siteContent, type SiteCopyKey } from "./site-content";

export const LANGS = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिन्दी" },
] as const;
export type Lang = (typeof LANGS)[number]["code"];
/** Localized text: English is required and used as the fallback. */
export type L = { en: string; mr?: string; hi?: string };

const STORAGE_KEY = "kodexa-lang";
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: UIKey | SiteCopyKey) => string;
  tr: (v: L) => string;
};
const I18nContext = createContext<Ctx | null>(null);

function isLang(v: unknown): v is Lang {
  return v === "en" || v === "mr" || v === "hi";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLang(saved)) setLangState(saved);
    } catch (error) {
      console.error("Unable to read the saved language preference.", error);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch (error) {
      console.error("Unable to save the language preference.", error);
    }
  }, []);

  const t = useCallback(
    (k: UIKey | SiteCopyKey) => {
      const key = k as string;
      const siteLocale = siteContent[lang] as Record<string, string>;
      const siteEnglish = siteContent.en as Record<string, string>;
      const uiLocale = ui[lang] as Record<string, string | undefined>;
      const uiEnglish = ui.en as Record<string, string>;
      return siteLocale[key] ?? siteEnglish[key] ?? uiLocale[key] ?? uiEnglish[key] ?? key;
    },
    [lang],
  );
  const tr = useCallback((v: L) => v[lang] || v.en, [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t, tr }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return c;
}
