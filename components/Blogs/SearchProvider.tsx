"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type BlogsSearchContextValue = {
  query: string;
  setQuery: (value: string) => void;
};

const BlogsSearchContext = createContext<BlogsSearchContextValue | null>(null);

export const BlogsSearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");

  return (
    <BlogsSearchContext.Provider value={{ query, setQuery }}>
      {children}
    </BlogsSearchContext.Provider>
  );
};

export const useBlogsSearch = () => {
  const ctx = useContext(BlogsSearchContext);
  if (!ctx) {
    throw new Error("useBlogsSearch must be used within a BlogsSearchProvider");
  }
  return ctx;
};
