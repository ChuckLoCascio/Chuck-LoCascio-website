#!/usr/bin/env bash
# Optional: slug → client-folder symlinks for legacy /case-study-*/<slug>/ URLs.
# Canonical static URLs use encoded client folder names (see src/lib/case-study-media.ts).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

link_one() {
  local segment="$1" slug="$2" source_folder="$3"
  local base="public/${segment}"
  rm -rf "${base:?}/${slug}"
  (cd "$base" && ln -sfn "$source_folder" "$slug")
}

link_one "case-study-images" "eq-sight" "Energy Quotient"
link_one "case-study-images" "blackrock-advisor-center" "BlackRock"
link_one "case-study-images" "grabbi-food-truck-self-checkout-platform" "Grabbi"
link_one "case-study-images" "svb-online-banking" "SVB"

link_one "case-study-videos" "eq-sight" "Energy Quotient"
link_one "case-study-videos" "blackrock-advisor-center" "BlackRock"
link_one "case-study-videos" "grabbi-food-truck-self-checkout-platform" "Grabbi"
link_one "case-study-videos" "svb-online-banking" "SVB"

echo "Case study slug symlinks OK under public/case-study-images and public/case-study-videos."
