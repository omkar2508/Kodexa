import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { FinalCTA, PageHero, meta } from "@/components/site/Layout";
import { services } from "@/lib/site";
import { useI18n } from "@/i18n";
import { localizeService, siteText } from "@/i18n/site-content";

export const Route = createFileRoute("/services")({
  head: () =>
    meta(
      "Services — Web, Mobile, UI/UX, Dashboards & Hosting | Kodexa",
      "Website development, mobile apps, UI/UX design, digital marketing, custom dashboards, data automation, hosting and IT consulting.",
    ),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        text={t("services.text")}
      />
      <div className="container-x mt-16 space-y-6">
        {services.map((service) => {
          const s = localizeService(service, t);
          return (
            <section
              id={s.slug}
              key={s.slug}
              className="grid scroll-mt-24 gap-8 rounded-2xl border bg-card p-8 md:grid-cols-[1fr_1.4fr]"
            >
              <div>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
                <h3 className="mt-6 text-sm font-semibold">{t("services.useCases")}</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {s.useCases.map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
                <Link
                  to="/quote"
                  search={{ service: s.slug }}
                  className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/90"
                >
                  {t("services.discuss")}
                </Link>
              </div>
              <div>
                <h3 className="mb-4 font-semibold">{t("services.offerings")}</h3>
                <ul className="grid content-start gap-3 sm:grid-cols-2">
                  {s.items.map((i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
      <FinalCTA />
    </>
  );
}
