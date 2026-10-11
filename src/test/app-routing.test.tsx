import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { projects } from "@/lib/site";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each([
    ["/", "/"],
    ["/services", "/services"],
    ["/work", "/work/"],
    ["/industries", "/industries"],
    ["/locations", "/locations"],
    ["/about", "/about"],
    ["/contact", "/contact"],
    ["/quote", "/quote"],
    ["/work/wonder-360-tours", "/work/$slug"],
  ])("matches %s to %s", (path, routeId) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.at(-1)?.routeId).toBe(routeId);
  });

  it.each(projects)("matches the $name project detail route", ({ slug }) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes(`/work/${slug}`);

    expect(matches.at(-1)?.routeId).toBe("/work/$slug");
  });
});
