#!/usr/bin/env bash
# compress-models.sh — Optimize GLB models for mobile performance
# Budget: <5MB file size, <50K faces, max 1024px textures
# Requires: gltf-transform (npm install -g @gltf-transform/cli)
set -euo pipefail

MODELS_DIR="public/models"
OUTPUT_DIR="public/models/optimized"
TEMP_DIR=$(mktemp -d)

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

echo "=== 3D Model Compression Pipeline ==="
echo "Output: $OUTPUT_DIR"
echo ""

# Models that need mesh simplification before optimization
declare -A SIMPLIFY_RATIOS=(
  ["space-shuttle.glb"]="0.15"
  ["apollo-saturn-v.glb"]="0.75"
  ["astronaut-converted.glb"]="0.59"
  ["drifting-astronaut.glb"]="0.35"
)

# Models that only need texture/draco compression (faces already under 50K)
TEXTURE_ONLY_MODELS=(
  "earth.glb"
)

# Models with many textures needing 512px (instead of 1024)
declare -A TEXTURE_SIZES=(
  ["various-planets.glb"]="512"
)

# Hero models — DO NOT COMPRESS
SKIP_MODELS=(
  "falcon-9.glb"
  "floating-astronaut.glb"
)

compress_model() {
  local input="$1"
  local basename=$(basename "$input")
  local output="$OUTPUT_DIR/$basename"
  local texture_size="${TEXTURE_SIZES[$basename]:-1024}"

  echo "Processing: $basename (texture max: ${texture_size}px)"

  # Check if model needs simplification
  if [[ -v "SIMPLIFY_RATIOS[$basename]" ]]; then
    local ratio="${SIMPLIFY_RATIOS[$basename]}"
    echo "  → Simplifying (ratio: $ratio)..."
    gltf-transform simplify "$input" "$TEMP_DIR/$basename" \
      --ratio "$ratio" \
      --error 0.01

    echo "  → Optimizing (Draco + WebP + resize)..."
    gltf-transform optimize "$TEMP_DIR/$basename" "$output" \
      --compress draco \
      --texture-compress webp \
      --texture-size "$texture_size"
  else
    echo "  → Optimizing (Draco + WebP + resize)..."
    gltf-transform optimize "$input" "$output" \
      --compress draco \
      --texture-compress webp \
      --texture-size "$texture_size"
  fi

  # Report result
  local orig_size=$(stat -f%z "$input" 2>/dev/null || stat --printf="%s" "$input")
  local opt_size=$(stat -f%z "$output" 2>/dev/null || stat --printf="%s" "$output")
  local reduction=$(echo "scale=1; (1 - $opt_size / $orig_size) * 100" | bc)
  echo "  ✓ $(ls -lh "$output" | awk '{print $5}') (${reduction}% reduction)"
  echo ""
}

# Process models that need simplification
for model in "${!SIMPLIFY_RATIOS[@]}"; do
  if [[ -f "$MODELS_DIR/$model" ]]; then
    compress_model "$MODELS_DIR/$model"
  else
    echo "⚠ MISSING: $model"
  fi
done

# Process texture-only models
for model in "${TEXTURE_ONLY_MODELS[@]}"; do
  if [[ -f "$MODELS_DIR/$model" ]]; then
    compress_model "$MODELS_DIR/$model"
  else
    echo "⚠ MISSING: $model"
  fi
done

# Process models with custom texture sizes
for model in "${!TEXTURE_SIZES[@]}"; do
  if [[ -f "$MODELS_DIR/$model" ]]; then
    compress_model "$MODELS_DIR/$model"
  else
    echo "⚠ MISSING: $model"
  fi
done

# Cleanup
rm -rf "$TEMP_DIR"

echo "=== Compression Complete ==="
echo ""
echo "Results:"
ls -lhS "$OUTPUT_DIR"/*.glb 2>/dev/null
echo ""
echo "Skipped (hero models): ${SKIP_MODELS[*]}"
