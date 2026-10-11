import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { LanguageSelector } from "@/components/site/Layout";
import { I18nProvider, useI18n } from "@/i18n";
import { industries, projects, services } from "@/lib/site";
import {
  localizeCategory,
  localizeIndustry,
  localizeProject,
  localizeRole,
  localizeService,
  siteContent,
  type SiteCopyKey,
} from "@/i18n/site-content";

function TranslationProbe() {
  const { t } = useI18n();
  return <p>{t("home.hero.title")}</p>;
}

describe("multilingual support", () => {
  beforeEach(() => localStorage.clear());

  it.each(["mr", "hi"] as const)("provides complete site-copy coverage for %s", (lang) => {
    const missingKeys = Object.keys(siteContent.en).filter((key) => !(key in siteContent[lang]));
    expect(missingKeys).toEqual([]);
  });

  it.each(["mr", "hi"] as const)("localizes shared and project data in %s", (lang) => {
    const t = (key: SiteCopyKey) => siteContent[lang][key] ?? siteContent.en[key];

    for (const service of services) {
      const localized = localizeService(service, t);
      expect(localized.title).not.toBe(service.title);
      expect(localized.desc).not.toBe(service.desc);
      expect(localized.items).not.toEqual(service.items);
      expect(localized.useCases).not.toEqual(service.useCases);
    }

    industries.forEach((industry, index) => {
      expect(localizeIndustry(industry, index, t).name).not.toBe(industry.name);
    });

    for (const project of projects.filter((item) => item.role !== "Industry reference")) {
      expect(localizeProject(project, t).summary).not.toBe(project.summary);
    }

    expect(localizeRole("Team role pending", t)).not.toBe("Team role pending");
    expect(localizeCategory("Business Websites", t)).not.toBe("Business Websites");
  });

  it("switches languages immediately and updates the document language and preference", async () => {
    render(
      <I18nProvider>
        <LanguageSelector />
        <TranslationProbe />
      </I18nProvider>,
    );

    fireEvent.change(screen.getByRole("combobox", { name: "Language" }), {
      target: { value: "mr" },
    });

    expect(screen.getByText("व्यवसायाला पुढे नेणारे डिजिटल अनुभव.")).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement.lang).toBe("mr"));
    expect(localStorage.getItem("kodexa-lang")).toBe("mr");
  });

  it("restores the saved language after a fresh provider mount", async () => {
    localStorage.setItem("kodexa-lang", "hi");

    render(
      <I18nProvider>
        <LanguageSelector />
        <TranslationProbe />
      </I18nProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("व्यवसाय को आगे बढ़ाने वाले डिजिटल अनुभव।")).toBeInTheDocument();
      expect(document.documentElement.lang).toBe("hi");
    });
    expect(screen.getByRole("combobox", { name: "भाषा" })).toHaveValue("hi");
  });
});
