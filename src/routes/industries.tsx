import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA, PageHero, meta } from "@/components/site/Layout";
import { industries } from "@/lib/site";
import { useI18n } from "@/i18n";
import { localizeIndustry } from "@/i18n/site-content";

export const Route = createFileRoute("/industries")({
  head: () =>
    meta(
      "Industries We Serve — Education, Fitness, Retail & more | Kodexa",
      "Digital solutions for colleges, healthcare, fitness, ecommerce, real estate, SMBs, professional services and startups.",
    ),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("industries.eyebrow")}
        title={t("industries.title")}
        text={t("industries.text")}
      />
      <div className="container-x mt-16 grid gap-5 md:grid-cols-2">
        {industries.map((industry, n) => {
          const i = localizeIndustry(industry, n, t);
          return (
            <div key={i.name} className="card-hover rounded-2xl border bg-card p-8">
              <span className="font-display text-sm text-primary">0{n + 1}</span>
              <h2 className="mt-3 text-2xl font-semibold">{i.name}</h2>
              <p className="mt-3 text-muted-foreground">{i.text}</p>
              <h3 className="mt-6 text-sm font-semibold">{t("industries.solutions")}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {i.solutions.map((solution) => (
                  <li key={solution}>• {solution}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <FinalCTA />
    </>
  );
}
