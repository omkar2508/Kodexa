import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FinalCTA, PageHero, meta } from "@/components/site/Layout";
import { process, services } from "@/lib/site";
import { useI18n } from "@/i18n";
import { localizeProcess, localizeService } from "@/i18n/site-content";

export const Route = createFileRoute("/about")({
  head: () =>
    meta(
      "About Us — Kodexa Digital",
      "Learn about Kodexa Digital's approach to designing and developing websites, apps, dashboards, and digital solutions.",
    ),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow={t("about.eyebrow")} title={t("about.title")} text={t("about.text")} />
      <section className="container-x mt-16 grid gap-6 md:grid-cols-3">
        {[
          [t("about.mission.title"), t("about.mission.text")],
          [t("about.work.title"), t("about.work.text")],
          [t("about.values.title"), t("about.values.text")],
        ].map(([title, description]) => (
          <div key={title} className="rounded-2xl border bg-card p-8">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>
      <section className="container-x mt-20">
        <h2 className="mb-8 text-3xl font-semibold">{t("about.capabilities")}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((original) => {
            const service = localizeService(original, t);
            return (
              <Link
                key={service.slug}
                to="/services"
                hash={service.slug}
                className="group rounded-xl border bg-card p-5 hover:border-primary/50"
              >
                <h3 className="font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
                <span className="mt-4 inline-flex items-center text-sm text-primary">
                  {t("about.exploreService")}{" "}
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="container-x mt-20">
        <h2 className="mb-8 text-3xl font-semibold">{t("about.process")}</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {process.map((step, i) => {
            const [title, description] = localizeProcess(step, i, t);
            return (
              <div key={title} className="rounded-2xl border bg-card p-5">
                <span className="text-primary">0{i + 1}</span>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            );
          })}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
