import Hero from "@/components/Blogs/Hero";
import Explore from "@/components/Blogs/Explore";
import { BlogsSearchProvider } from "@/components/Blogs/SearchProvider";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blogs",
  description: "Skincare science, ingredient deep-dives, and dermatologist insights from the Formial Labs team.",
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <BlogsSearchProvider>
      <Hero />
      <Explore />
    </BlogsSearchProvider>
  );
}
