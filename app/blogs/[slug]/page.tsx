import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import ArticleBody from "@/components/Blogs/ArticleBody";
import PrevNext from "@/components/Blogs/PrevNext";
import BlogCard from "@/components/Blogs/BlogCard";
import { getAllBlogSlugs, getBlogBySlug, getAdjacentBlogs, getRelatedBlogs } from "@/lib/blogs";
import { formatBlogDate } from "@/lib/blogFormat";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blogs/${post.slug}`,
    image: post.heroImage,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentBlogs(slug);
  const related = getRelatedBlogs(slug, post.category);

  return (
    <article className="w-full bg-white pt-24 pb-20 md:pt-28">
      <ContainerLayout pt={false} pb={false}>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary/60 transition-colors duration-200 ease-in-out hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            Back to Clarity Lab Notes
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-primary/50">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{post.category}</span>
            <span>{formatBlogDate(post.date)}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-4 font-aeonik text-4xl leading-tight tracking-tight text-primary sm:text-5xl">
            {post.title}
          </h1>

          {post.author.name && (
            <div className="mt-6 flex items-center gap-3">
              {post.author.image && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image src={post.author.image} alt={post.author.name} fill sizes="48px" className="object-cover" />
                </div>
              )}
              <div className="leading-tight">
                <p className="text-sm font-semibold text-primary">{post.author.name}</p>
                {post.author.creds && <p className="text-xs text-primary/60">{post.author.creds}</p>}
                {post.editor && <p className="text-xs text-primary/50">{post.editor}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="relative mx-auto mt-8 aspect-video max-w-4xl overflow-hidden rounded-3xl">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <ArticleBody html={post.bodyHtml} />
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <PrevNext previous={previous} next={next} />
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-5xl">
            <h2 className="font-aeonik text-2xl text-primary sm:text-3xl">
              More in {post.category}
            </h2>
            <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-3">
              {related.map((r) => (
                <BlogCard key={r.slug} post={r} />
              ))}
            </div>
          </div>
        )}
      </ContainerLayout>
    </article>
  );
}
