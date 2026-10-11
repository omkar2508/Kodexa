import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, ChevronDown } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Btn, FinalCTA, SectionHead, meta } from "@/components/site/Layout";
import { ProjectCard } from "@/components/site/ProjectCard";
import { services, projects, industries, process, cities, faqs } from "@/lib/site";
import { useI18n } from "@/i18n";
import {
  localizeFaq,
  localizeIndustry,
  localizeProcess,
  localizeProject,
  localizeService,
  siteText,
} from "@/i18n/site-content";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Kodexa Digital — Web, App & Digital Solutions Agency in Maharashtra",
      "Explore websites, mobile applications, dashboards and digital services for clients in Maharashtra and across India, subject to project scope and availability.",
    ),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const localizedServices = services.map((service) => localizeService(service, t));
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0" />
        <div className="container-x relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="mb-5 inline-flex rounded-full border px-4 py-1.5 text-xs text-muted-foreground">
              {t("home.hero.kicker")}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] md:text-6xl xl:text-7xl">
              <span className="text-gradient">{t("home.hero.title")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t("home.hero.text")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to="/quote">
                {t("home.hero.start")} <ArrowRight className="h-4 w-4" />
              </Btn>
              <Btn to="/work" variant="ghost">
                {t("home.hero.work")}
              </Btn>
            </div>
          </div>
          <img
            src={hero}
            width={1600}
            height={1104}
            alt={t("home.hero.image")}
            className="w-full rounded-2xl border shadow-glow"
          />
        </div>
        <div className="container-x relative grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
          {localizedServices.slice(0, 4).map((s) => (
            <div key={s.slug} className="flex items-center gap-3 bg-background p-5 text-sm">
              <s.icon className="h-5 w-5 text-primary" />
              {s.title.split(" ").slice(0, 2).join(" ")}
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-24 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">{t("home.intro.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("home.intro.text")}</p>
          <Link to="/about" className="mt-5 inline-flex text-sm font-semibold text-primary">
            {t("home.intro.link")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            [t("home.value.0.title"), t("home.value.0.text")],
            [t("home.value.1.title"), t("home.value.1.text")],
            [t("home.value.2.title"), t("home.value.2.text")],
            [t("home.value.3.title"), t("home.value.3.text")],
          ].map(([a, b]) => (
            <div key={b} className="rounded-2xl border bg-card p-5">
              <div className="font-display text-2xl font-semibold text-primary">{a}</div>
              <div className="mt-1 text-sm text-muted-foreground">{b}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-28">
        <SectionHead eyebrow={t("home.services.eyebrow")} title={t("home.services.title")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {localizedServices.map((s) => (
            <Link
              key={s.slug}
              to="/services"
              hash={s.slug}
              className="card-hover group rounded-2xl border bg-card p-6"
            >
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <span className="mt-4 flex items-center gap-1 text-sm text-primary opacity-70 group-hover:opacity-100">
                {t("home.service.learn")} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow={t("home.work.eyebrow")} title={t("home.work.title")} />
          <Link to="/work" className="mb-12 text-sm text-primary">
            {t("home.work.link")}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} p={localizeProject(p, t)} />
          ))}
        </div>
      </section>

      <section className="container-x mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow={t("home.industries.eyebrow")} title={t("home.industries.title")} />
          <Link to="/industries" className="mb-12 text-sm text-primary">
            {t("home.industries.link")}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => {
            const i = localizeIndustry(industry, index, t);
            return (
              <div key={i.name} className="rounded-2xl border bg-card p-6">
                <h3 className="font-semibold">{i.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{i.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-x mt-28 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow={t("home.why.eyebrow")} title={t("home.why.title")} />
          <ul className="space-y-3">
            {Array.from({ length: 5 }, (_, index) => siteText(t, `home.why.${index}`)).map((w) => (
              <li key={w} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHead eyebrow={t("home.process.eyebrow")} title={t("home.process.title")} />
          <ol className="relative space-y-6 border-l pl-8">
            {process.map((step, i) => {
              const [title, description] = localizeProcess(step, i, t);
              return (
                <li key={title} className="relative">
                  <span className="absolute -left-[46px] grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="container-x mt-28">
        <SectionHead
          eyebrow={t("home.locations.eyebrow")}
          title={t("home.locations.title")}
          text={t("home.locations.text")}
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {cities.map((c) => (
            <div key={c} className="flex items-center gap-2 rounded-xl border bg-card p-4 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              {c}
            </div>
          ))}
        </div>
        <Link to="/locations" className="mt-5 inline-flex text-sm font-semibold text-primary">
          {t("home.locations.link")} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>

      <section className="container-x mt-28 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <SectionHead eyebrow={t("home.faq.eyebrow")} title={t("home.faq.title")} />
        <div className="divide-y rounded-2xl border bg-card">
          {faqs.map((faq, index) => {
            const [q, a] = localizeFaq(faq, index, t);
            return (
              <details key={q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                  {q}
                  <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            );
          })}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
