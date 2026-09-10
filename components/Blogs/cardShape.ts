import type { CSSProperties } from "react";

export const CARD_SHAPE_URL = "/assets/blogs/card-shape-img.png";

/**
 * Folder-tab silhouette (notch cut top-right) used across blog card art.
 * `cover` (not a 100% 100% stretch) keeps the asset's native proportions —
 * stretching it onto a box with a very different aspect ratio (e.g. the
 * wide/short featured-card panel) squashes the notch into a flat sliver.
 * `top` positioning keeps the notch itself in frame on very short boxes.
 */
export const cardShapeMaskStyle: CSSProperties = {
  WebkitMaskImage: `url(${CARD_SHAPE_URL})`,
  maskImage: `url(${CARD_SHAPE_URL})`,
  WebkitMaskSize: "cover",
  maskSize: "cover",
  WebkitMaskPosition: "top",
  maskPosition: "top",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};
