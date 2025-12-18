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
            className="border border-[#80808042] rounded-2xl"
          >
            <div className="h-full flex flex-col justify-between rounded-2xl shadow-custom-dark duration-200">
              {/* Card Image part */}
              <div className="w-full h-[225px] md:w-full group overflow-hidden rounded-2xl relative">
                <Image
                  src={urlForImage(mainImage).url()}
                  width={200}
                  height={200}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 rounded-tl-md rounded-bl-md"
                  priority={true}
                />
                <div className="absolute top-0 left-0 bg-black/20 w-full h-full group-hover:hidden duration-200" />
              </div>

              <div className="w-full grow flex flex-col gap-3 justify-between p-4">
                <div className="flex flex-col gap-5">
                  {/* Categories & Date */}
                  <div className="flex items-center justify-between gap-2 ">
                    <div className="flex gap-2 items-center">
                      <FaTags className="text-mainColor" size={18} />
                      {categories?.map((category: Category) => (
                        <p key={category._id} className="text-sm text-muted-foreground cursor-auto">
                          {category.title}
                        </p>
                      ))}
                    </div>

                    <p className="text-sm flex gap-2 items-center cursor-auto text-muted-foreground">
                      <FaCalendarDay className="text-mainColor" size={18} />
                      {new Date(_createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-foreground hover:text-mainColor duration-200 cursor-pointer">
                    {title}
                  </h2>
                </div>
              </div>

              {/* Card Bottom part */}
              <div className="bg-[rgba(163,162,163,0.1)] rounded-b-2xl cursor-auto">
                <div className="px-4 py-5 flex items-center justify-between">
                  <div className="flex items-center justify-between gap-2 cursor-pointer hover:text-mainColor text-foreground">
                    Read More
                    <HiMiniArrowUpRight size={18} />
                  </div>
                  <div className="flex gap-3 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FaRegComments size={22} />
                      <span>12</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GrView size={18} />
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
