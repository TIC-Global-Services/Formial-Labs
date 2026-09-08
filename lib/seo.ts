import type { Metadata } from "next";

export const SITE_NAME = "Formial Labs";
export const SITE_TITLE = `${SITE_NAME} — Personalized Skincare, Prescribed For You`;
export const SITE_URL = "https://formial.in";
export const SITE_DESCRIPTION =
  "Personalized, dermatologist-designed skincare. Take a free skin assessment and get a prescription-grade formula compounded specifically for you.";
export const DEFAULT_OG_IMAGE = "/assets/home/hero-banner.png";
export const TWITTER_HANDLE = "@formiallabs";

type SeoOptions = {
  /**
   * Page title. The root layout appends " | Formial Labs" automatically —
   * pass just the page name. Omit only on the homepage, to inherit the
   * site's default title as-is (no suffix).
   */
  title?: string;
  description?: string;
  /** Route path starting with "/", e.g. "/our-story". Defaults to the homepage. */
  path?: string;
  /** Path to a social preview image, relative to the site root. */
  image?: string;
  /** Set true for pages that shouldn't be indexed (results pages, thin/duplicate content). */
  noIndex?: boolean;
  type?: "website" | "article";
};

/**
 * Builds a consistent Metadata object (canonical URL, Open Graph, Twitter
 * Card, robots directives) for a single page. Use in every page.tsx via:
 *
 *   export const metadata = buildMetadata({ title: "...", description: "...", path: "/..." });
 */
export const buildMetadata = ({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = "website",
}: SeoOptions): Metadata => {
  const url = `${SITE_URL}${path}`;
  // openGraph/twitter titles are a separate namespace from `title` and are
  // never auto-suffixed by the layout's title template, so they always need
  // an explicit, full-looking value — falling back to the site title.
  const socialTitle = title ?? SITE_TITLE;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 2000, height: 1055, alt: socialTitle }],
      locale: "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: socialTitle,
      description,
      images: [image],
    },
  };
};
