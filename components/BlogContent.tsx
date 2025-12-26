"use client";
import React from "react";
import { Post } from "@types";
import Container from "./../components/Container";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/image";
import { useSearchContext } from "@app/context/SearchContext";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { GrView } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { FaTags } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa";

// Define the Category type
interface Category {
  _id: string | null | undefined;
  title: string | null | undefined;
}

interface BlogContentProps {
  posts: Post[];
}

const BlogContent: React.FC<BlogContentProps> = ({ posts }) => {
  const { filteredItems } = useSearchContext();

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {filteredItems.map((post) => {
        const { _id, mainImage, categories, _createdAt, title, slug } = post;

        return (
          <Link
            key={_id}
            href={{
              pathname: `/post/${slug?.current}`,
              query: { slug: slug?.current },
            }}
            className="group block bg-card rounded-xl border border-border hover:border-mainColor/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Card Image part */}
              <div className="w-full h-[200px] group overflow-hidden relative">
                <Image
                  src={urlForImage(mainImage).url()}
                  width={400}
                  height={200}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  priority={true}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

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
                <h2 className="text-xl font-semibold text-foreground group-hover:text-mainColor duration-200 line-clamp-2">
                  {title}
                </h2>

                {/* Read More */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-mainColor font-medium">
                    Read More
                    <HiMiniArrowUpRight size={16} />
                  </div>
                  <div className="flex gap-3 text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                      <GrView size={16} />
                      <span>50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </Container>
  );
};

export default React.memo(BlogContent);
