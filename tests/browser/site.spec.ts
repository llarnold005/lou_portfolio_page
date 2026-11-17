import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/about",
  "/writing",
  "/work",
  "/work/the-resistance",
  "/impact",
  "/ideas",
  "/contact",
  "/writing/observing-agentic-systems",
];
for (const route of routes) {
  test(`route and accessibility: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
test("search, category filtering, code, and demo publication boundaries", async ({
  page,
  request,
}) => {
  await page.goto("/writing");
  await page.getByRole("searchbox").fill("agent");
  await expect(page.locator(".writing-row")).toHaveCount(1);
  await page.getByRole("searchbox").fill("");
  await page
    .getByLabel("Category", { exact: true })
    .selectOption("Community and Opportunity");
  await expect(page.locator(".writing-row")).toHaveCount(1);
  await page.getByRole("searchbox").fill("unmatchedxyz");
  await expect(page.getByText("No matching articles.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".writing-row")).toHaveCount(3);
  await page.goto("/writing/observing-agentic-systems");
  await expect(page.locator("pre code")).toContainText("event_id");
  await expect(page.locator("table")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  const feed = await request.get("/feed.xml");
  expect(feed.status()).toBe(200);
  expect(await feed.text()).not.toContain("<item>");
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "observing-agentic-systems",
  );
});
test("mobile navigation, reduced motion, dark theme, and overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL("/about");
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveClass("dark");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.reload();
  await expect(page.locator("html")).toHaveClass("dark");
});
test("contact setup state and server rejection", async ({ page, request }) => {
  await page.goto("/contact?category=The%20Resistance");
  await expect(page.getByLabel("What brings you here?")).toHaveValue(
    "The Resistance",
  );
  await expect(
    page.getByRole("button", { name: "Email setup required" }),
  ).toBeDisabled();
  const response = await request.post("/api/contact", {
    headers: { origin: "http://localhost:3000" },
    data: {},
  });
  expect(response.status()).toBe(503);
});
test("not found and metadata", async ({ page }) => {
  const response = await page.goto("/not-a-page");
  expect(response?.status()).toBe(404);
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^http:\/\/localhost:3000\/?$/,
  );
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
});

test("tablet, narrow mobile, and dark reading remain accessible", async ({
  page,
}) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.emulateMedia({ colorScheme: "dark" });
  for (const route of routes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});

test("cinematic photography placeholders and architecture interactions", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "I don’t just",
  );
  await expect(page.locator(".photograph-hero img")).toHaveAttribute(
    "src",
    "/images/profile/placeholder.svg",
  );
  await expect(
    page.getByRole("navigation", { name: "Story chapters" }),
  ).toBeVisible();
  await page.goto("/work/the-resistance");
  await page
    .getByRole("button", { name: "Technical View", exact: true })
    .click();
  await page.getByRole("button", { name: /Ingestion Pipeline/ }).click();
  await expect(page.locator("#architecture-detail")).toContainText("Kafka");
  await page.getByRole("button", { name: "Simple View", exact: true }).click();
  await expect(page.locator("#architecture-detail")).toContainText(
    "required information",
  );
  await page
    .getByRole("button", { name: "Play fictional event", exact: true })
    .click();
  await expect(page.locator(".event-token")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Pause demonstration" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause demonstration" }).click();
  await page.getByRole("button", { name: "Reset demonstration" }).click();
  await expect(page.locator(".event-token")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.getByRole("button", { name: "Step fictional event" }).click();
  await expect(page.locator(".demo-console")).toContainText("document.read");
  await page.getByRole("button", { name: "Step fictional event" }).click();
  await expect(page.locator("#architecture-detail h3")).toHaveText(
    "Activity Events",
  );
  const stage = page.getByRole("button", { name: /Security Analysis/ });
  await stage.focus();
  await page.keyboard.press("Enter");
  await expect(stage).toHaveAttribute("aria-pressed", "true");
});
test("content and complete architecture remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore my work", exact: true }),
  ).toBeVisible();
  await page.goto("http://localhost:3000/work/the-resistance");
  await page
    .getByText("Read the complete architecture as text", { exact: true })
    .click();
  await expect(page.locator(".architecture-text")).toContainText("Python");
  await expect(page.locator(".architecture-text li")).toHaveCount(5);
  await context.close();
});
test("article progress advances with reading and responsive photos do not overflow", async ({
  page,
}) => {
  await page.goto("/writing/observing-agentic-systems");
  await page.evaluate(() =>
    window.scrollTo(0, document.querySelector("article")!.scrollHeight),
  );
  await expect
    .poll(() =>
      page.locator(".reading-progress").evaluate((el) => {
        const value = getComputedStyle(el).transform;
        return value === "none" ? 0 : new DOMMatrixReadOnly(value).a;
      }),
    )
    .toBeGreaterThan(0.5);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const photo = page.locator(".photograph-hero");
  const title = page.locator("h1");
  expect((await photo.boundingBox())!.y).toBeLessThan(
    (await title.boundingBox())!.y,
  );
  expect(
    await page
      .locator(".photograph-hero img")
      .evaluate((el) => getComputedStyle(el).objectFit),
  ).toBe("contain");
});
