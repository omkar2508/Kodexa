import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { PageHero, meta } from "@/components/site/Layout";
import { LeadForm } from "@/components/site/LeadForm";
import { BRAND, cities } from "@/lib/site";
import { useI18n } from "@/i18n";
import { siteText } from "@/i18n/site-content";

export const Route = createFileRoute("/contact")({
  head: () =>
    meta(
      "Contact Us — Kodexa Digital",
      "Contact Kodexa Digital about a project. Form delivery is pending and submitted information is not sent or stored.",
    ),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        text={t("contact.intro")}
      />
      <div className="container-x mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-6">
          {BRAND.email ? (
            <div className="flex gap-3">
              <Mail className="shrink-0 text-primary" />
              <a href={`mailto:${BRAND.email}`} className="break-all">
                {BRAND.email}
              </a>
            </div>
          ) : (
            <div className="flex gap-3">
              <Mail className="shrink-0 text-primary" />
              <p className="text-muted-foreground">{t("contact.emailPending")}</p>
            </div>
          )}
          <div className="flex gap-3">
            <MapPin className="shrink-0 text-primary" />
            <p className="text-muted-foreground">
              {siteText(t, "contact.serving").replace("{cities}", cities.join(", "))}
            </p>
          </div>
        </aside>
        <LeadForm />
      </div>
    </>
  );
}
