import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { BRAND, services, projects, cities } from "@/lib/site";
import { LANGS, useI18n, type Lang } from "@/i18n";
import { localizeService } from "@/i18n/site-content";

const nav = [
  { to: "/services", key: "nav.services" },
  { to: "/work", key: "nav.work" },
  { to: "/industries", key: "nav.industries" },
  { to: "/locations", key: "nav.locations" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
        K
      </span>
      {BRAND.name}
      <span className="text-primary">.</span>
    </Link>
  );
}

export function Btn({
  to,
  children,
  variant = "primary",
  onClick,
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
}) {
  const cls =
    variant === "primary"
      ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90"
      : "border border-input text-foreground hover:bg-secondary";
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${cls}`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSelector />
          <Btn to="/quote">{t("nav.quote")}</Btn>
        </div>
        <button
          className="lg:hidden"
          aria-label={t(open ? "nav.menu.close" : "nav.menu.open")}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div id="mobile-navigation" className="border-t lg:hidden">
          <div className="container-x flex flex-col gap-4 py-5">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-muted-foreground"
              >
                {t(n.key)}
              </Link>
            ))}
            <LanguageSelector />
            <Btn to="/quote" onClick={() => setOpen(false)}>
              {t("nav.quote")}
            </Btn>
          </div>
        </div>
      )}
    </header>
  );
}

export function LanguageSelector() {
  const { t, lang, setLang } = useI18n();
  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{t("language.label")}</span>
      <select
        aria-label={t("language.label")}
        value={lang}
        onChange={(event) => {
          const selected = LANGS.find(({ code }) => code === event.target.value)?.code;
          if (selected) setLang(selected);
        }}
        className="min-w-24 rounded-md border border-input bg-background px-2 py-2 text-foreground"
      >
        {LANGS.map(({ code }) => (
          <option key={code} value={code}>
            {t(`language.${code}` as `language.${Lang}`)}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t bg-surface">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          {BRAND.email ? (
            <a href={`mailto:${BRAND.email}`} className="block break-all text-sm text-primary">
              {BRAND.email}
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">{t("footer.email.pending")}</p>
          )}
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">{t("footer.services")}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services" hash={s.slug}>
                  {localizeService(s, t).title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">{t("footer.projects")}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {projects
              .filter((p) => p.role !== "Industry reference")
              .map((p) => (
                <li key={p.slug}>
                  <Link to="/work/$slug" params={{ slug: p.slug }}>
                    {p.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">{t("footer.explore")}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/industries">{t("nav.industries")}</Link>
            </li>
            <li>
              <Link to="/locations">{t("nav.locations")}</Link>
            </li>
            <li>
              <Link to="/about">{t("nav.about")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("nav.contact")}</Link>
            </li>
            <li>
              <Link to="/quote">{t("nav.quote")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">{t("footer.locations")}</h2>
          <p className="text-sm text-muted-foreground">{cities.join(" · ")}</p>
          <p className="mt-2 text-xs text-muted-foreground">{t("footer.availability")}</p>
          <Link to="/locations" className="mt-3 inline-block text-sm text-primary">
            {t("footer.locations.link")}
          </Link>
        </div>
      </div>
      <div className="container-x flex flex-wrap justify-between gap-4 border-t py-6 text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} {BRAND.full}. {t("footer.rights")}
        </span>
      </div>
    </footer>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-grid absolute inset-0" />
      <div className="container-x relative py-20 md:py-28">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{text}</p>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { t } = useI18n();
  return (
    <section className="container-x mt-24">
      <div className="relative overflow-hidden rounded-3xl border bg-accent p-10 text-center md:p-16">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold md:text-5xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("cta.text")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn to="/quote">{t("cta.start")}</Btn>
            <Btn to="/contact" variant="ghost">
              {t("cta.contact")}
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
