import { NextResponse } from "next/server";
import { fetchPublicStore } from "@/lib/server-api";

function absoluteFromRequest(origin: string, pathOrUrl: string): string {
  const raw = pathOrUrl.trim();
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return `${origin}${path}`;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const origin = new URL(request.url).origin;
  const store = await fetchPublicStore(slug);
  const profile = store?.storeSettings?.profileImageUrl?.trim();
  const iconSrc = profile
    ? absoluteFromRequest(origin, profile)
    : `${origin}/herbizreach-logo.png`;
  const displayName = store?.business.businessName ?? slug;

  const manifest = {
    id: `herbizreach-store-${slug}`,
    name: `${displayName} · HerBizReach`,
    short_name: displayName.length > 16 ? `${displayName.slice(0, 14)}…` : displayName,
    description: store?.storeSettings?.tagline?.trim() || "Shop this store on HerBizReach",
    start_url: `/store/${slug}`,
    scope: `/store/${slug}/`,
    display: "standalone" as const,
    orientation: "portrait-primary" as const,
    background_color: "#faf5ff",
    theme_color: store?.storeSettings?.accentColor?.trim() || "#7c3aed",
    icons: [
      profile
        ? { src: iconSrc, sizes: "512x512", purpose: "any" as const }
        : {
            src: iconSrc,
            sizes: "512x512",
            type: "image/png",
            purpose: "any" as const,
          },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
