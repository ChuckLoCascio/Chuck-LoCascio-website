#!/usr/bin/env bash
# Links public/case-study-{images,videos}/<slug> → project case-study-{images,videos}/<folder>
# so Next.js can serve files while you keep source assets in repo-root folders.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

link_one() {
  local segment="$1" slug="$2" source_folder="$3"
  local target="public/${segment}/${slug}"
  # Relative to the symlink path: public/<segment>/<slug> → ../../<segment>/<folder>
  local source="../../${segment}/${source_folder}"
  rm -rf "$target"
  ln -sf "$source" "$target"
}

# Images (slug paths align with case study H1–based URLs under /work/<slug>)
link_one "case-study-images" "eq-sight" "Energy Quotient"
link_one "case-study-images" "blackrock-advisor-center" "BlackRock"
link_one "case-study-images" "grabbi-food-truck-self-checkout-platform" "Grabbi"
link_one "case-study-images" "svb-online-banking" "SVB"

# Videos
link_one "case-study-videos" "eq-sight" "Energy Quotient"
link_one "case-study-videos" "blackrock-advisor-center" "BlackRock"
link_one "case-study-videos" "grabbi-food-truck-self-checkout-platform" "Grabbi"
link_one "case-study-videos" "svb-online-banking" "SVB"

echo "Case study asset symlinks OK under public/case-study-images and public/case-study-videos."
