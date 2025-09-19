import { getAllArticles } from "@/lib/db";
import fs from "fs";
import type { NextRequest } from "next/server";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

type UrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: number;
};

function findAppDir(): string | null {
  const srcApp = path.join(process.cwd(), "src", "app");
  const app = path.join(process.cwd(), "app");
  if (fs.existsSync(srcApp)) return srcApp;
  if (fs.existsSync(app)) return app;
  return null;
}

function getStaticRoutes(dir: string, base = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // skip group folders like (game)
      const isGroup = entry.name.startsWith("(") && entry.name.endsWith(")");
      const segment = isGroup ? "" : `/${entry.name}`;
      routes.push(...getStaticRoutes(entryPath, `${base}${segment}`));
    } else if (entry.isFile() && entry.name === "page.tsx") {
      routes.push(base === "" ? "/" : base);
    }
  }

  return routes.filter((route) => !route.includes("["));
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(_req: NextRequest) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  // 1) find app dir (supports src/app or app)
  const appDir = findAppDir();
  const staticRoutes = appDir ? getStaticRoutes(appDir) : [];

  // 2) map static routes to UrlEntry[]
  const staticUrls: UrlEntry[] = staticRoutes.map((route) => ({
    loc: `${siteUrl}${route}`,
    changefreq: "monthly",
    priority: route === "/" ? 1.0 : 0.6,
  }));

  // 3) dynamic routes — example: blog articles
  const articles = await getAllArticles();
  const dynamicUrls: UrlEntry[] = articles.map((a) => ({
    loc: `${siteUrl}/blog/${encodeURIComponent(a.slug)}`,
    lastmod: a.updated_at ? new Date(a.updated_at).toISOString() : undefined,
    changefreq: "weekly",
    priority: 0.7,
  }));

  // 4) merge
  const urls: UrlEntry[] = [...staticUrls, ...dynamicUrls];

  // 5) build xml
  const urlXml = urls
    .map((u) => {
      const lastmodTag = u.lastmod ? `  <lastmod>${u.lastmod}</lastmod>\n` : "";
      return `<url>
  <loc>${escapeXml(u.loc)}</loc>
${lastmodTag}  <changefreq>${u.changefreq}</changefreq>
  <priority>${u.priority.toFixed(1)}</priority>
</url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=59",
    },
  });
}
