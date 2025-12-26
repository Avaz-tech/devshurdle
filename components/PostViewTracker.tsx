"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PostViewTracker({ slug }: { slug: string }) {
  const pathname = usePathname();

  useEffect(() => {
    // Only track views on the actual post page
    if (pathname === `/post/${slug}`) {
      // Track view
      fetch(`/api/posts/${slug}/views`, {
        method: "POST",
      }).catch((error) => {
        console.error("Error tracking view:", error);
      });
    }
  }, [slug, pathname]);

  return null;
}

