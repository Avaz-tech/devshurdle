"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  postSlug: string;
  initialLikes?: number;
  initialLiked?: boolean;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export default function LikeButton({
  postSlug,
  initialLikes = 0,
  initialLiked = false,
  size = "md",
  showCount = true,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Fetch current like status
    const fetchLikes = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const response = await fetch(`/api/posts/${postSlug}/likes`);
        const data = await response.json();
        setLikes(data.likes || 0);
        if (user) {
          setLiked(data.userLiked || false);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [postSlug, supabase]);

  const handleLike = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/signIn");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${postSlug}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes || 0);
        setLiked(data.liked || false);
      } else {
        const error = await response.json();
        if (response.status === 401) {
          router.push("/signIn");
        } else {
          console.error("Error toggling like:", error);
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-2 transition-all duration-200 ${
        liked
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground hover:text-red-500"
      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={liked ? "Unlike this post" : "Like this post"}
    >
      {liked ? (
        <FaHeart size={iconSizes[size]} className="fill-current" />
      ) : (
        <FaRegHeart size={iconSizes[size]} className="fill-current" />
      )}
      {showCount && (
        <span className={sizeClasses[size]}>{likes}</span>
      )}
    </button>
  );
}

