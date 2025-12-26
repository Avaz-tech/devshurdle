import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already liked this post
    const { data: existingLike } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_slug", slug)
      .eq("user_id", user.id)
      .single();

    if (existingLike) {
      // Unlike: delete the like
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_slug", slug)
        .eq("user_id", user.id);

      if (error) throw error;

      // Get updated like count
      const { count } = await supabase
        .from("post_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_slug", slug);

      return NextResponse.json({ 
        liked: false, 
        likes: count || 0 
      }, { status: 200 });
    } else {
      // Like: insert new like
      const { error } = await supabase.from("post_likes").insert({
        post_slug: slug,
        user_id: user.id,
      });

      if (error) throw error;

      // Get updated like count
      const { count } = await supabase
        .from("post_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_slug", slug);

      return NextResponse.json({ 
        liked: true, 
        likes: count || 0 
      }, { status: 200 });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    // Get total likes
    const { count } = await supabase
      .from("post_likes")
      .select("*", { count: "exact", head: true })
      .eq("post_slug", slug);

    // Check if current user has liked this post
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let userLiked = false;
    if (user) {
      const { data } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_slug", slug)
        .eq("user_id", user.id)
        .single();

      userLiked = !!data;
    }

    return NextResponse.json({ 
      likes: count || 0,
      userLiked 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ likes: 0, userLiked: false }, { status: 200 });
  }
}

