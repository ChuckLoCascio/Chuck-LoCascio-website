import fs from "fs";
import path from "path";

/**
 * Listing tries `public/case-study-images|videos/<client folder>/` first, then the same segment with `<slug>/`.
 * Public URLs use whichever directory exists (encoded folder name or slug) so asset paths match.
 */
export const CASE_STUDY_IMAGES = "case-study-images" as const;
export const CASE_STUDY_VIDEOS = "case-study-videos" as const;

/** Slug → client folder name under `public/case-study-images/` / `public/case-study-videos/` */
export const CASE_STUDY_ASSET_FOLDER: Record<string, string> = {
  "eq-sight": "Energy Quotient",
  "blackrock-advisor-center": "BlackRock",
  "grabbi-food-truck-self-checkout-platform": "Grabbi",
  "svb-online-banking": "SVB",
};

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov|ogg)$/i;

/** Basenames (no extension), lowercase — order preserved. When set, only these clips appear on the case study page. */
const CASE_STUDY_VIDEO_ALLOWLIST: Partial<Record<string, readonly string[]>> = {
  "eq-sight": ["eq-demo-night-video", "eq sight 3"],
  "blackrock-advisor-center": ["advisor center poll 2"],
  /** Clips under `grabbi-food-truck-self-checkout-platform/` (or `Grabbi/`). */
  "grabbi-food-truck-self-checkout-platform": [
    "grabbi-tap",
    "05-29-21-the-smoke-stop",
    "05-16-21-john-endorsement-the-smoke-stop",
  ],
};

function basenameNoExtFromUrl(url: string): string {
  const file = decodeURIComponent(url.split("/").pop() ?? "");
  return file.replace(/\.[^.]+$/, "").toLowerCase();
}

function filterAndOrderVideosByAllowlist(
  slug: string,
  urls: string[]
): string[] {
  const allow = CASE_STUDY_VIDEO_ALLOWLIST[slug];
  if (!allow?.length) {
    return urls;
  }
  const orderMap = new Map(allow.map((b, i) => [b, i]));
  const filtered = urls.filter((u) => orderMap.has(basenameNoExtFromUrl(u)));
  /** If nothing matched (renamed files, etc.), show all discovered clips instead of hiding the section. */
  if (filtered.length === 0 && urls.length > 0) {
    return urls;
  }
  return filtered.sort(
    (a, b) =>
      (orderMap.get(basenameNoExtFromUrl(a)) ?? 0) -
      (orderMap.get(basenameNoExtFromUrl(b)) ?? 0)
  );
}

function toPublicUrl(
  segment: typeof CASE_STUDY_IMAGES | typeof CASE_STUDY_VIDEOS,
  clientFolder: string,
  filename: string
): string {
  const safeFolder = clientFolder
    .split("/")
    .map((p) => encodeURIComponent(p))
    .join("/");
  const safeFile = filename
    .split("/")
    .map((p) => encodeURIComponent(p))
    .join("/");
  return `/${segment}/${safeFolder}/${safeFile}`;
}

/**
 * Prefer client folder, then slug folder — use the first directory that contains at least one
 * file matching `extTest` (so an empty `Grabbi/` does not block `grabbi-food-truck-self-checkout-platform/`).
 */
function resolveCaseStudyMediaDir(
  segment: string,
  slug: string,
  folder: string,
  extTest: RegExp
): { dir: string; urlFolderSegment: string } | null {
  const base = path.join(process.cwd(), "public", segment);
  const candidates: { dir: string; urlFolderSegment: string }[] = [
    { dir: path.join(base, folder), urlFolderSegment: folder },
    { dir: path.join(base, slug), urlFolderSegment: slug },
  ];
  for (const { dir, urlFolderSegment } of candidates) {
    try {
      if (!fs.statSync(dir).isDirectory()) {
        continue;
      }
      const names = fs.readdirSync(dir, { withFileTypes: true });
      const hasMatch = names.some(
        (d) => d.isFile() && extTest.test(d.name)
      );
      if (hasMatch) {
        return { dir, urlFolderSegment };
      }
    } catch {
      continue;
    }
  }
  return null;
}

function listMedia(
  segment: typeof CASE_STUDY_IMAGES | typeof CASE_STUDY_VIDEOS,
  slug: string,
  extTest: RegExp
): string[] {
  const folder = CASE_STUDY_ASSET_FOLDER[slug];
  if (!folder) {
    return [];
  }
  const resolved = resolveCaseStudyMediaDir(segment, slug, folder, extTest);
  if (!resolved) {
    return [];
  }
  const { dir, urlFolderSegment } = resolved;
  try {
    const names = fs.readdirSync(dir, { withFileTypes: true });
    return names
      .filter((d) => d.isFile() && extTest.test(d.name))
      .map((d) => d.name)
      .sort()
      .map((f) => toPublicUrl(segment, urlFolderSegment, f));
  } catch {
    return [];
  }
}

/** Image paths under `public/case-study-images/<folder>/`; URLs include encoded folder segment. */
export function getCaseStudyImages(slug: string): string[] {
  const urls = listMedia(CASE_STUDY_IMAGES, slug, IMAGE_EXT);
  return orderPreferredFirstImage(slug, urls);
}

/** First image after optional slug-specific preferred order—used for homepage / work index thumbnails. */
export function getCaseStudyThumbnail(slug: string): string | undefined {
  const imgs = getCaseStudyImages(slug);
  return imgs[0];
}

/** Video paths under `public/case-study-videos/<folder>/`; URLs include encoded folder segment. */
export function getCaseStudyVideos(slug: string): string[] {
  const urls = listMedia(CASE_STUDY_VIDEOS, slug, VIDEO_EXT);
  return filterAndOrderVideosByAllowlist(slug, urls);
}

/** Basename (no extension) to show first in galleries / as listing thumbnail when present. */
const PREFERRED_FIRST_IMAGE_BASENAME: Record<string, string> = {
  /** Homepage + listing: Advisor Center homepage mockup (`BlackRock-Advisor-Center-Homepage.png`). */
  "blackrock-advisor-center": "blackrock-advisor-center-homepage",
  /** Homepage + listing: Facility Map (PQ Events) over alphabetical Dashboard first. */
  "eq-sight": "eq sight - facility map view",
};

/** Basename (no extension) to prefer as the default first clip for a slug. */
const PREFERRED_DEFAULT_VIDEO_BASENAME: Record<string, string> = {
  "eq-sight": "EQ-Demo-Night-Video",
  "blackrock-advisor-center": "Advisor Center Poll 2",
  "grabbi-food-truck-self-checkout-platform": "grabbi-tap",
};

function orderPreferredFirstImage(slug: string, urls: string[]): string[] {
  const preferred = PREFERRED_FIRST_IMAGE_BASENAME[slug];
  if (!preferred || urls.length === 0) {
    return urls;
  }
  const prefLower = preferred.toLowerCase();
  const idx = urls.findIndex((url) => {
    const file = decodeURIComponent(url.split("/").pop() ?? "");
    const base = file.replace(/\.[^.]+$/, "").toLowerCase();
    return base === prefLower;
  });
  if (idx <= 0) {
    return urls;
  }
  const next = [...urls];
  const [chosen] = next.splice(idx, 1);
  return [chosen, ...next];
}

/**
 * Puts the preferred default clip first when its filename matches (case-insensitive).
 */
export function orderCaseStudyVideos(slug: string, videos: string[]): string[] {
  if (CASE_STUDY_VIDEO_ALLOWLIST[slug]?.length) {
    return videos;
  }
  const preferred = PREFERRED_DEFAULT_VIDEO_BASENAME[slug];
  if (!preferred || videos.length === 0) {
    return videos;
  }
  const prefLower = preferred.toLowerCase();
  const idx = videos.findIndex((url) => {
    const file = decodeURIComponent(url.split("/").pop() ?? "");
    const base = file.replace(/\.[^.]+$/, "").toLowerCase();
    return base === prefLower || base.includes(prefLower);
  });
  if (idx <= 0) {
    return videos;
  }
  const next = [...videos];
  const [chosen] = next.splice(idx, 1);
  return [chosen, ...next];
}
