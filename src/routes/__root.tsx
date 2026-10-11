import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

import { Header, Footer } from "../components/site/Layout";
import { I18nProvider, useI18n } from "../i18n";
import { type SiteCopyKey } from "../i18n/site-content";
import { projects } from "../lib/site";
import { localizeProject } from "../i18n/site-content";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("notFound.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("notFound.text")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("error.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const { t } = useI18n();
  console.error(error);
  const router = useRouter();
  useEffect(() => {
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("error.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("error.text")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("error.retry")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("error.home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kodexa Digital" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizedMetadata />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}

function LocalizedMetadata() {
  const { t, lang } = useI18n();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const page = segments[0] ?? "home";
    const knownPages = ["services", "work", "industries", "about", "locations", "contact", "quote"];
    const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const knownPaths = new Set([
      "/",
      "/services",
      "/work",
      "/industries",
      "/about",
      "/locations",
      "/contact",
      "/quote",
    ]);
    const isKnownProject =
      segments.length === 2 &&
      segments[0] === "work" &&
      projects.some(({ slug }) => slug === segments[1]);
    const isNotFound = !knownPaths.has(normalizedPath) && !isKnownProject;
    const routePage =
      page === "work"
        ? segments[1]
          ? "project"
          : "work"
        : knownPages.includes(page)
          ? page
          : "home";
    const titleKey = `seo.${routePage}.title`;
    const descriptionKey = `seo.${routePage}.description`;
    const project =
      routePage === "project" ? projects.find(({ slug }) => slug === segments[1]) : undefined;
    const title = project
      ? `${project.name} — ${t("seo.project.title")}`
      : t(titleKey as SiteCopyKey);
    const description = project
      ? localizeProject(project, t).summary
      : t(descriptionKey as SiteCopyKey);
    const pageTitle = isNotFound ? `${t("notFound.title")} | Kodexa Digital` : title;
    const pageDescription = isNotFound ? t("notFound.text") : description;
    document.title = pageTitle;
    document.documentElement.lang = lang;
    const setMetaContent = (
      selector: string,
      attribute: "name" | "property",
      key: string,
      content: string,
    ) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = content;
    };
    setMetaContent('meta[name="description"]', "name", "description", pageDescription);
    setMetaContent('meta[property="og:title"]', "property", "og:title", pageTitle);
    setMetaContent(
      'meta[property="og:description"]',
      "property",
      "og:description",
      pageDescription,
    );
    setMetaContent('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaContent('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    setMetaContent(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      pageDescription,
    );
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (isNotFound) {
      if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.name = "robots";
        document.head.append(robotsMeta);
      }
      robotsMeta.content = "noindex, nofollow";
    } else if (robotsMeta?.content === "noindex, nofollow") {
      robotsMeta.remove();
    }
  }, [lang, pathname, t]);

  return null;
}
