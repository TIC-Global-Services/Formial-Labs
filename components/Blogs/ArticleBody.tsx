"use client";

import { useEffect, useRef } from "react";

/**
 * Article bodies are scraped HTML that includes a Formial FAQ "accordion"
 * widget styled via an embedded <style> block (display:none unless the
 * item has an `active` class) but the click handler that lives in the
 * source theme's page JS wasn't captured. Wire it back up here.
 */
const ArticleBody = ({ html }: { html: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const headers = root.querySelectorAll<HTMLElement>(".accordion-header");
    const onClick = (e: Event) => {
      const item = (e.currentTarget as HTMLElement).closest(".accordion-item");
      item?.classList.toggle("active");
    };

    headers.forEach((header) => header.addEventListener("click", onClick));
    return () => headers.forEach((header) => header.removeEventListener("click", onClick));
  }, [html]);

  return (
    <div
      ref={ref}
      className="article-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default ArticleBody;
