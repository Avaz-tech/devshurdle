import { Metadata } from "next";
import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";
import { createClient } from "@/lib/supabase/server";
import Container from "@components/Container";
import Breadcrumb from "@components/Breadcrumb";
import Link from "next/link";
import { FaEye, FaHeart, FaComment, FaChartBar } from "react-icons/fa6";
import { Post } from "@types";

export const metadata: Metadata = {
  title: "Post Statistics | DevsHurdle",
  description: "View statistics for all posts including views, likes, and comments",
};

async function getStats() {
  try {
    const supabase = await createClient();

    // Get all views, likes, and comments
    const [viewsResult, likesResult, commentsResult] = await Promise.all([
      supabase.from("post_views").select("post_slug"),
      supabase.from("post_likes").select("post_slug"),
      supabase.from("post_comments").select("post_slug"),
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

    return { stats, totals };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { stats: [], totals: { totalViews: 0, totalLikes: 0, totalComments: 0, totalPosts: 0 } };
  }
}

async function getPosts() {
  const postsQuery = groq`*[_type == "post"]{
    _id,
    title,
    slug,
    _createdAt
  } | order(_createdAt desc)`;

  return await client.fetch(postsQuery);
}

export default async function StatsPage() {
  const statsData = await getStats();
  const posts = await getPosts();

  // Create a map of post slugs to post titles
  const postMap = new Map(posts.map((post: Post) => [post.slug?.current, post.title]));

  // Merge stats with post titles
  const statsWithTitles = statsData.stats.map((stat: any) => ({
    ...stat,
    title: postMap.get(stat.post_slug) || stat.post_slug,
  }));

  // Sort by views descending
  const sortedStats = statsWithTitles.sort((a: any, b: any) => b.views - a.views);

  return (
    <main className="flex justify-center items-center flex-col pt-24 pb-16">
      <Container className="mx-4 xl:mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Statistics" }]} />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center gap-3">
              <FaChartBar className="text-mainColor" />
              Post Statistics
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive analytics for all posts including views, likes, and comments
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Views</h3>
                <FaEye className="text-mainColor" size={20} />
              </div>
              <p className="text-3xl font-bold text-foreground">{statsData.totals.totalViews.toLocaleString()}</p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Likes</h3>
                <FaHeart className="text-red-500" size={20} />
              </div>
              <p className="text-3xl font-bold text-foreground">{statsData.totals.totalLikes.toLocaleString()}</p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Comments</h3>
                <FaComment className="text-mainColor" size={20} />
              </div>
              <p className="text-3xl font-bold text-foreground">{statsData.totals.totalComments.toLocaleString()}</p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Posts</h3>
                <FaChartBar className="text-mainColor" size={20} />
              </div>
              <p className="text-3xl font-bold text-foreground">{statsData.totals.totalPosts}</p>
            </div>
          </div>

          {/* Statistics Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Post Performance</h2>
              <p className="text-sm text-muted-foreground mt-1">Detailed statistics for each post</p>
            </div>

            {sortedStats.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No statistics available yet. Posts will appear here once they receive views, likes, or comments.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Post</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                        <div className="flex items-center justify-end gap-2">
                          <FaEye size={14} />
                          Views
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                        <div className="flex items-center justify-end gap-2">
                          <FaHeart size={14} />
                          Likes
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                        <div className="flex items-center justify-end gap-2">
                          <FaComment size={14} />
                          Comments
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sortedStats.map((stat: any, index: number) => (
                      <tr key={stat.post_slug} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">{stat.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.post_slug}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-foreground font-medium">{stat.views.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-foreground font-medium">{stat.likes.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-foreground font-medium">{stat.comments.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/post/${stat.post_slug}`}
                            className="text-mainColor hover:text-mainColor/80 font-medium text-sm transition-colors"
                          >
                            View →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}

