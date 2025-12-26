import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get all posts from Sanity (we'll need to fetch this differently)
    // For now, we'll get stats for all slugs in our database

    // Get total views, likes, and comments counts
    const [viewsResult, likesResult, commentsResult] = await Promise.all([
      supabase.from("post_views").select("post_slug", { count: "exact", head: false }),
      supabase.from("post_likes").select("post_slug", { count: "exact", head: false }),
      supabase.from("post_comments").select("post_slug", { count: "exact", head: false }),
    ]);

    // Aggregate stats by post_slug
    const viewsByPost: Record<string, number> = {};
    const likesByPost: Record<string, number> = {};
    const commentsByPost: Record<string, number> = {};

    // Count views per post
    if (viewsResult.data) {
      viewsResult.data.forEach((view: any) => {
        viewsByPost[view.post_slug] = (viewsByPost[view.post_slug] || 0) + 1;
      });
    }

    // Count likes per post
    if (likesResult.data) {
      likesResult.data.forEach((like: any) => {
        likesByPost[like.post_slug] = (likesByPost[like.post_slug] || 0) + 1;
      });
    }

    // Count comments per post
    if (commentsResult.data) {
      commentsResult.data.forEach((comment: any) => {
        commentsByPost[comment.post_slug] = (commentsByPost[comment.post_slug] || 0) + 1;
      });
    }

    // Get all unique post slugs
    const allSlugs = new Set([
      ...Object.keys(viewsByPost),
      ...Object.keys(likesByPost),
      ...Object.keys(commentsByPost),
    ]);

    // Build stats array
    const stats = Array.from(allSlugs).map((slug) => ({
      post_slug: slug,
      views: viewsByPost[slug] || 0,
      likes: likesByPost[slug] || 0,
      comments: commentsByPost[slug] || 0,
    }));

    // Calculate totals
    const totals = {
      totalViews: Object.values(viewsByPost).reduce((sum, count) => sum + count, 0),
      totalLikes: Object.values(likesByPost).reduce((sum, count) => sum + count, 0),
      totalComments: Object.values(commentsByPost).reduce((sum, count) => sum + count, 0),
      totalPosts: allSlugs.size,
    };

    return NextResponse.json(
      {
        stats,
        totals,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        stats: [],
        totals: {
          totalViews: 0,
          totalLikes: 0,
          totalComments: 0,
          totalPosts: 0,
        },
      },
      { status: 200 }
    );
  }
}

