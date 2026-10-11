import { createFileRoute } from "@tanstack/react-router";
import { PageHero, meta } from "@/components/site/Layout";
import { LeadForm } from "@/components/site/LeadForm";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>) => {
    const service = search["service"];
    return typeof service === "string" ? { service } : {};
  },
  head: () =>
    meta(
      "Get a Quote — Kodexa Digital",
      "Share your project goals, budget, and timeline. Form delivery is pending and submissions are not sent or stored.",
    ),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  const { service } = Route.useSearch();
  return (
    <>
      <PageHero eyebrow={t("quote.eyebrow")} title={t("quote.title")} text={t("quote.intro")} />
      <div className="container-x mt-16 max-w-4xl">
        <LeadForm quote {...(service ? { initialService: service } : {})} />
      </div>
    </>
  );
}
