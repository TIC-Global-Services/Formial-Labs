import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const routes: Route[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/free-skin-assesment", priority: 0.9, changeFrequency: "monthly" },
  { path: "/our-story", priority: 0.8, changeFrequency: "monthly" },
  { path: "/trust", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ingredients-library", priority: 0.6, changeFrequency: "monthly" },
  { path: "/research", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blogs", priority: 0.6, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
  { path: "/telehealth-consent", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-cancellations", priority: 0.3, changeFrequency: "yearly" },
  { path: "/money-back-guarantee", priority: 0.4, changeFrequency: "yearly" },
  { path: "/grievance-policy", priority: 0.3, changeFrequency: "yearly" },
];

const sitemap = (): MetadataRoute.Sitemap =>
  routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

export default sitemap;
