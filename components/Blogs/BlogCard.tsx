import Image from "next/image";
import Link from "next/link";
import type { BlogSummary } from "@/lib/blogs";
import { cardShapeMaskStyle } from "./cardShape";

const BlogCard = ({ post }: { post: BlogSummary }) => (
  <Link href={`/blogs/${post.slug}`} className="group block">
    <div className="relative aspect-[868/720]">
      <div className="absolute inset-0" style={cardShapeMaskStyle}>
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          sizes="(min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <p className="absolute top-0 right-5 max-w-[35%] truncate text-right text-sm  text-primary sm:text-lg">
        {post.readTime} &middot; {post.category}
      </p>
    </div>
    <h3 className="mt-3 font-aeonik text-lg leading-snug text-primary">{post.title}</h3>
    <p className="mt-1 line-clamp-2 text-sm text-primary/60">{post.excerpt}</p>
  </Link>
);

export default BlogCard;
