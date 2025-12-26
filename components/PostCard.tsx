"use client";

import React, { useState, useEffect } from "react";
import { Post } from "@types";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/image";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { GrView } from "react-icons/gr";
import { FaTags } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa";
import LikeButton from "./LikeButton";

interface Category {
  _id: string | null | undefined;
  title: string | null | undefined;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { _id, mainImage, categories, _createdAt, title, slug } = post;
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Fetch view count
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/posts/${slug?.current}/views`);
        const data = await response.json();
        setViews(data.views || 0);
      } catch (error) {
        console.error("Error fetching views:", error);
        setViews(0);
      }
    };

    if (slug?.current) {
      fetchViews();
    }
  }, [slug?.current]);

  return (
    <div className="group block bg-card rounded-xl border border-border hover:border-mainColor/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden h-full flex flex-col">
      {/* Card Image part */}
      <Link
        href={{
          pathname: `/post/${slug?.current}`,
          query: { slug: slug?.current },
        }}
        className="w-full h-[200px] group overflow-hidden relative block"
      >
        <Image
          src={urlForImage(mainImage).url()}
          width={400}
          height={200}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 duration-500"
          priority={true}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </Link>

      <div className="flex flex-col gap-4 p-6 flex-grow">
        {/* Categories & Date */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 items-center">
            <FaTags className="text-mainColor" size={16} />
            {categories?.slice(0, 2).map((category: Category) => (
              <span key={category._id} className="text-sm text-muted-foreground">
                {category.title}
              </span>
            ))}
          </div>

          <p className="text-sm flex gap-2 items-center text-muted-foreground">
            <FaCalendarDay className="text-mainColor" size={16} />
            {new Date(_createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "2-digit",
            })}
          </p>
        </div>

        {/* Title */}
        <Link
          href={{
            pathname: `/post/${slug?.current}`,
            query: { slug: slug?.current },
          }}
        >
          <h2 className="text-xl font-semibold text-foreground group-hover:text-mainColor duration-200 line-clamp-2">
            {title}
          </h2>
        </Link>

        {/* Read More & Stats */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
          <Link
            href={{
              pathname: `/post/${slug?.current}`,
              query: { slug: slug?.current },
            }}
            className="flex items-center gap-2 text-mainColor font-medium hover:text-mainColor/80 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Read More
            <HiMiniArrowUpRight size={16} />
          </Link>
          <div className="flex gap-4 text-muted-foreground text-sm items-center">
            <div className="flex items-center gap-1">
              <GrView size={16} />
              <span>{views !== null ? views : "..."}</span>
            </div>
            <div onClick={(e) => e.preventDefault()} onMouseDown={(e) => e.stopPropagation()}>
              <LikeButton postSlug={slug?.current || ""} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

