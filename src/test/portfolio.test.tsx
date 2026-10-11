import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "@/components/site/ProjectCard";
import { filterProjects, filters, portfolioCategories, projects } from "@/lib/site";
import { I18nProvider } from "@/i18n";

describe("portfolio data and filters", () => {
  it("retains all existing projects and adds the three requested entries", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "resource-optimization-dashboard",
      "wonder-360-tours",
      "fitverse-app",
      "mahesh-portfolio",
      "cult-fit-reference",
      "rina-deshmukh-portfolio",
      "financial-advisor",
      "sgjss",
    ]);
  });

  it("defines unique project identifiers and valid HTTPS project URLs", () => {
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    for (const project of projects) {
      expect(project.slug).toBeTruthy();
      expect(project.name).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.categories.length).toBeGreaterThan(0);
      expect(new Set(project.categories).size).toBe(project.categories.length);
      expect(project.url).toMatch(/^https:\/\//);
      expect(() => new URL(project.url)).not.toThrow();
      expect(projects.filter((item) => item.slug === project.slug)).toHaveLength(1);
    }
  });

  it("offers All Projects and every declared category as a filter", () => {
    expect(filters).toEqual(["All Projects", ...portfolioCategories]);
  });

  it.each(portfolioCategories)("filters %s without duplicate cards", (category) => {
    const filtered = filterProjects(category);
    expect(new Set(filtered.map((project) => project.slug)).size).toBe(filtered.length);
    expect(filtered.every((project) => project.categories.includes(category))).toBe(true);
  });

  it("returns every project once for All Projects", () => {
    const all = filterProjects("All Projects");
    expect(all).toHaveLength(projects.length);
    expect(new Set(all.map((project) => project.slug)).size).toBe(projects.length);
  });

  it("keeps unconfirmed ownership and external references explicit", () => {
    for (const slug of ["rina-deshmukh-portfolio", "financial-advisor", "sgjss"]) {
      expect(projects.find((project) => project.slug === slug)?.role).toBe("Team role pending");
    }
    expect(projects.find((project) => project.slug === "cult-fit-reference")?.role).toBe(
      "Industry reference",
    );
  });
});

describe("project cards", () => {
  it("shows an honest preview fallback and safe external link for a reference project", () => {
    const reference = projects.find((project) => project.slug === "cult-fit-reference");
    if (!reference) throw new Error("Expected Cult.fit industry reference project.");
    render(
      <I18nProvider>
        <ProjectCard p={reference} />
      </I18nProvider>,
    );

    expect(screen.getByRole("heading", { name: "Cult.fit" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Preview image unavailable — Cult.fit" }),
    ).toBeInTheDocument();
    const liveLink = screen.getByRole("link", {
      name: "Visit reference — Cult.fit (opens in a new tab)",
    });
    expect(liveLink).toHaveAttribute("href", "https://www.cult.fit/");
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByRole("link", { name: /View Case Study/ })).not.toBeInTheDocument();
  });
});
