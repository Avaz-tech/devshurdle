"use client";
import React from "react";
import { Post } from "@types";
import Container from "./../components/Container";
import { useSearchContext } from "@app/context/SearchContext";
import PostCard from "./PostCard";

interface BlogContentProps {
  posts: Post[];
  limit?: number;
}

const BlogContent: React.FC<BlogContentProps> = ({ posts, limit }) => {
  const { filteredItems } = useSearchContext();

  const itemsToRender = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {itemsToRender.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Container>
  );
};

export default React.memo(BlogContent);
