import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { FinalCTA, meta } from "@/components/site/Layout";
import { ProjectCard, ProjectPreview } from "@/components/site/ProjectCard";
import { projects } from "@/lib/site";
import { useI18n } from "@/i18n";
import { localizeCategory, localizeProject, localizeRole, siteText } from "@/i18n/site-content";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) =>
    loaderData
      ? meta(`${loaderData.name} — Project | Kodexa`, loaderData.summary)
      : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: NotFound,
  component: Page,
});

function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container-x py-32 text-center">
      <h1 className="text-3xl font-semibold">{t("project.notFound")}</h1>
      <Link to="/work" className="mt-4 inline-block text-primary">
        {t("project.backWork")}
      </Link>
    </div>
  );
}

function Page() {
  const { t } = useI18n();
  const project = localizeProject(Route.useLoaderData(), t);
  const details = project.details;
  const rows: { title: string; content: ReactNode }[] = [];

  if (details?.context) rows.push({ title: t("project.overview"), content: details.context });
  if (details?.problem) rows.push({ title: t("project.problem"), content: details.problem });
  if (details?.requirements?.length) {
    rows.push({
      title: t("project.requirements"),
      content: (
        <ul className="list-disc space-y-1 pl-5">
          {details.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    });
  }
  if (details?.solution) rows.push({ title: t("project.solution"), content: details.solution });
  if (details?.features?.length) {
    rows.push({
      title: t("project.features"),
      content: (
        <ul className="list-disc space-y-1 pl-5">
          {details.features.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    });
  }
  if (details?.design) rows.push({ title: t("project.design"), content: details.design });
  if (details?.implementation)
    rows.push({ title: t("project.implementation"), content: details.implementation });
  if (details?.technologies?.length) {
    rows.push({ title: t("project.technologies"), content: details.technologies.join(", ") });
  }
  if (details?.contribution)
    rows.push({ title: t("project.contribution"), content: details.contribution });
  if (details?.results) rows.push({ title: t("project.results"), content: details.results });

  const relatedProjects = projects
    .filter(
      (item) =>
        item.slug !== project.slug &&
        item.role !== "Industry reference" &&
        item.categories.some((category) => project.categories.includes(category)),
    )
    .slice(0, 3);

  return (
    <>
      <section className="container-x py-16">
        <Link to="/work" className="text-sm text-muted-foreground">
          {t("project.back")}
        </Link>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
            >
              {localizeCategory(category, (key) => siteText(t, key))}
            </span>
          ))}
        </div>
        <p className="mt-4 inline-flex rounded-full bg-accent px-3 py-1 text-xs text-primary">
          {localizeRole(project.role, t)}
        </p>
        <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{project.name}</h1>
        <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{project.summary}</p>
        {project.draftNote && (
          <p className="mt-5 max-w-3xl rounded-xl border bg-card p-4 text-sm text-muted-foreground">
            {project.draftNote}
          </p>
        )}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.role === "Industry reference" ? t("project.referenceLink") : t("project.liveLink")} — ${project.name} (${t("portfolio.opensNew")})`}
          className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm hover:bg-secondary"
        >
          {project.role === "Industry reference"
            ? t("project.referenceLink")
            : t("project.liveLink")}
          <ExternalLink className="h-4 w-4" />
        </a>
        <div className="mt-12">
          <ProjectPreview p={project} />
        </div>
      </section>
      {rows.length > 0 ? (
        <section className="container-x divide-y rounded-2xl border bg-card">
          {rows.map(({ title, content }) => (
            <div key={title} className="grid gap-2 p-6 md:grid-cols-[220px_1fr]">
              <h2 className="font-semibold">{title}</h2>
              <div className="text-muted-foreground">{content}</div>
            </div>
          ))}
          {!details?.technologies?.length && (
            <div className="grid gap-2 p-6 md:grid-cols-[220px_1fr]">
              <h2 className="font-semibold">{t("project.technologies")}</h2>
              <p className="text-muted-foreground">{t("project.techUnavailable")}</p>
            </div>
          )}
        </section>
      ) : (
        <p className="container-x text-sm text-muted-foreground">
          {t("project.detailsUnavailable")}
        </p>
      )}
      {relatedProjects.length > 0 && (
        <section className="container-x mt-20">
          <h2 className="mb-6 text-2xl font-semibold">{t("project.related")}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((item) => (
              <ProjectCard key={item.slug} p={item} />
            ))}
          </div>
        </section>
      )}
      <FinalCTA />
    </>
  );
}
