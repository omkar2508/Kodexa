import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { FinalCTA, PageHero, meta } from "@/components/site/Layout";
import { cities, services } from "@/lib/site";
import { useI18n } from "@/i18n";
import { localizeService, siteText } from "@/i18n/site-content";

export const Route = createFileRoute("/locations")({
  head: () =>
    meta(
      "Locations — Kodexa Digital",
      "Explore Kodexa Digital's service areas in Mumbai, Pune, Kolhapur, Sangli, Satara, and Pandharpur, with remote project delivery across India subject to availability.",
    ),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("locations.eyebrow")}
        title={t("locations.title")}
        text={t("locations.intro")}
      />
      <section className="container-x mt-16">
        <h2 className="text-3xl font-semibold">{t("locations.areas")}</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">{t("locations.areaIntro")}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <article key={city} className="rounded-2xl border bg-card p-6">
              <h3 className="flex items-center gap-2 text-xl font-semibold">
                <MapPin className="h-5 w-5 text-primary" />
                {city}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {siteText(t, "locations.cityText").replace("{city}", city)}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="container-x mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-3xl font-semibold">{t("locations.remote.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("locations.remote.text")}</p>
          <p className="mt-4 text-sm text-muted-foreground">{t("locations.noOffice")}</p>
        </div>
        <div className="rounded-2xl border bg-card p-7">
          <h2 className="text-xl font-semibold">{t("locations.services")}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {services.map((original) => {
              const service = localizeService(original, t);
              return (
                <li key={service.slug}>
                  <Link
                    to="/services"
                    hash={service.slug}
                    className="text-sm text-primary hover:underline"
                  >
                    {service.title} →
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="container-x mt-16 text-center">
        <p className="text-muted-foreground">{t("locations.quoteNote")}</p>
        <Link
          to="/quote"
          className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/90"
        >
          {t("locations.discuss")}
        </Link>
      </section>
      <FinalCTA />
    </>
  );
}
