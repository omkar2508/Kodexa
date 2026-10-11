import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/site";
import { useI18n } from "@/i18n";
import { localizeCategory, localizeProject, localizeRole, siteText } from "@/i18n/site-content";

export function ProjectPreview({ p }: { p: Project }) {
  const { t } = useI18n();
  const [previewFailed, setPreviewFailed] = useState(false);
  const previewImage = p.previewImage;
  const host = new URL(p.url).hostname.replace(/^www\./, "");

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border bg-surface">
      {previewImage && !previewFailed ? (
        <img
          src={previewImage.src}
          alt={previewImage.alt}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setPreviewFailed(true)}
        />
      ) : (
        <div
          className="bg-grid flex h-full flex-col items-center justify-center gap-2 p-6 text-center"
          role="img"
          aria-label={`${t("portfolio.preview.unavailable")} — ${p.name}`}
        >
          <span className="font-display text-xl font-semibold text-gradient">{p.name}</span>
          <span className="text-xs text-muted-foreground">
            {previewFailed ? t("portfolio.preview.unavailable") : t("portfolio.preview.missing")} ·{" "}
            {host}
          </span>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  const { t } = useI18n();
  const reference = p.role === "Industry reference";
  const localized = localizeProject(p, t);
  const roleTone = reference
    ? "bg-muted text-muted-foreground"
    : p.role === "Team role pending"
      ? "bg-secondary text-muted-foreground"
      : "bg-accent text-primary";

  return (
    <article className="card-hover flex h-full flex-col rounded-2xl border bg-card p-4">
      <ProjectPreview p={localized} />
      <div className="flex flex-1 flex-col p-2 pt-5">
        <div className="flex flex-wrap gap-2" aria-label={t("portfolio.projectCategories")}>
          {p.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
            >
              {localizeCategory(category, (key) => siteText(t, key))}
            </span>
          ))}
        </div>
        <h2 className="mt-3 text-lg font-semibold">{p.name}</h2>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{localized.summary}</p>
        {p.details?.technologies && p.details.technologies.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            {t("portfolio.verifiedTech")} {p.details.technologies.join(", ")}
          </p>
        )}
        {localized.draftNote && (
          <p className="mt-3 text-xs text-muted-foreground">{localized.draftNote}</p>
        )}
        <div className="mt-4">
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs ${roleTone}`}>
            {localizeRole(p.role, t)}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {p.details && !reference && (
            <Link to="/work/$slug" params={{ slug: p.slug }} className="font-semibold text-primary">
              {t("portfolio.caseStudy")}
            </Link>
          )}
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${reference ? t("portfolio.visitReference") : t("portfolio.visit")} — ${p.name} (${t("portfolio.opensNew")})`}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            {reference ? t("portfolio.visitReference") : t("portfolio.visit")}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
