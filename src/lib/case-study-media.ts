import fs from "fs";
import path from "path";

/**
 * Canonical URL segments under `public/` (see symlinks to project-root folders).
 * Source assets live in repo-root `case-study-images/` and `case-study-videos/`
 * (e.g. `Energy Quotient/`, `BlackRock/`). Each `public/case-study-images/<slug>/`
 * is a symlink to the matching project folder so Next can serve files at
 * `/case-study-images/<slug>/...`.
 */
export const CASE_STUDY_IMAGES = "case-study-images" as const;
export const CASE_STUDY_VIDEOS = "case-study-videos" as const;

/** Slug → folder name under `case-study-images/` / `case-study-videos/` */
export const CASE_STUDY_ASSET_FOLDER: Record<string, string> = {
  "eq-sight": "Energy Quotient",
  "blackrock-advisor-center": "BlackRock",
  "grabbi-food-truck-self-checkout-platform": "Grabbi",
  "svb-online-banking": "SVB",
};

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov|ogg)$/i;

function toPublicUrl(
  segment: typeof CASE_STUDY_IMAGES | typeof CASE_STUDY_VIDEOS,
  slug: string,
  filename: string
): string {
  const safe = filename
    .split("/")
    .map((p) => encodeURIComponent(p))
    .join("/");
  return `/${segment}/${slug}/${safe}`;
}

function listMedia(
  segment: typeof CASE_STUDY_IMAGES | typeof CASE_STUDY_VIDEOS,
  slug: string,
  extTest: RegExp
): string[] {
  const dir = path.join(process.cwd(), "public", segment, slug);
  try {
    const names = fs.readdirSync(dir, { withFileTypes: true });
    return names
      .filter((d) => d.isFile() && extTest.test(d.name))
      .map((d) => d.name)
      .sort()
      .map((f) => toPublicUrl(segment, slug, f));
  } catch {
    return [];
  }
}

/** Image/screenshot artifacts from `public/case-study-images/<slug>/` (symlinked to project `case-study-images/`). */
export function getCaseStudyImages(slug: string): string[] {
  const urls = listMedia(CASE_STUDY_IMAGES, slug, IMAGE_EXT);
  return orderPreferredFirstImage(slug, urls);
}

/** First image after optional slug-specific preferred order—used for homepage / work index thumbnails. */
export function getCaseStudyThumbnail(slug: string): string | undefined {
  const imgs = getCaseStudyImages(slug);
  return imgs[0];
}

/** Video artifacts from `public/case-study-videos/<slug>/` (symlinked to project `case-study-videos/`). */
export function getCaseStudyVideos(slug: string): string[] {
  return listMedia(CASE_STUDY_VIDEOS, slug, VIDEO_EXT);
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
  "blackrock-advisor-center": "Advisor Center Poll",
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
