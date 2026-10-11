import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FinalCTA, PageHero, meta } from "@/components/site/Layout";
import { ProjectCard } from "@/components/site/ProjectCard";
import { filterProjects, filters, type PortfolioFilter } from "@/lib/site";
import { useI18n } from "@/i18n";
import { localizeCategory } from "@/i18n/site-content";
import { siteText } from "@/i18n/site-content";

export const Route = createFileRoute("/work/")({
  head: () =>
    meta(
      "Our Work — Portfolio & Case Studies | Kodexa",
      "Browse business websites, personal portfolios, education projects, web apps, dashboards, fitness, tourism, financial services, and organization websites.",
    ),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<PortfolioFilter>("All Projects");
  const visibleProjects = filterProjects(selectedCategory);

  return (
    <>
      <PageHero
        eyebrow={t("portfolio.eyebrow")}
        title={t("portfolio.title")}
        text={t("portfolio.text")}
      />
      <div className="container-x mt-12">
        <div className="mb-8">
          <div
            role="group"
            aria-label={t("portfolio.filter.label")}
            className="flex flex-wrap gap-2"
          >
            {filters.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedCategory === category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {localizeCategory(category, (key) => siteText(t, key))}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
            {visibleProjects.length}{" "}
            {t(visibleProjects.length === 1 ? "portfolio.count.one" : "portfolio.count.many")}
            {selectedCategory === "All Projects"
              ? ""
              : ` ${t("portfolio.count.in")} ${localizeCategory(selectedCategory, (key) => siteText(t, key))}`}
          </p>
        </div>
        {visibleProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} p={project} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            {t("portfolio.empty")}
          </p>
        )}
      </div>
      <FinalCTA />
    </>
  );
}
