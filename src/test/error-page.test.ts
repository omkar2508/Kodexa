import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { renderErrorPage } from "@/lib/error-page";

describe("catastrophic error page", () => {
  it.each([
    ["en", "This page didn't load", "Try again"],
    ["mr", "हे पान लोड झाले नाही", "पुन्हा प्रयत्न करा"],
    ["hi", "यह पेज लोड नहीं हो पाया", "फिर कोशिश करें"],
  ] as const)("uses the saved %s language", (lang, title, retry) => {
    const html = renderErrorPage();
    const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
    if (!script) throw new Error("Expected the error page language initialization script.");

    const elements = new Map(
      ["error-title", "error-message", "error-retry", "error-home"].map((id) => [
        id,
        { textContent: "" },
      ]),
    );
    const documentMock = {
      documentElement: { lang: "en" },
      title: "",
      getElementById(id: string) {
        const element = elements.get(id);
        if (!element) throw new Error(`Missing error page element: ${id}`);
        return element;
      },
    };

    runInNewContext(script, {
      localStorage: { getItem: () => lang },
      document: documentMock,
      console,
    });

    expect(documentMock.documentElement.lang).toBe(lang);
    expect(documentMock.title).toBe(title);
    expect(elements.get("error-retry")?.textContent).toBe(retry);
  });
});
