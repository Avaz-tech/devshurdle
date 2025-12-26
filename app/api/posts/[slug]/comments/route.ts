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

    const body = await request.json();
    const { content } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: "Comment content is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("post_comments")
      .insert({
        post_slug: slug,
        user_id: user.id,
        content: content.trim(),
      })
      .select()
      .single();

    if (error) throw error;

    // Get user profile for the comment
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      ...data,
      user: {
        id: user.id,
        email: profile?.email || user.email,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    // Get comments - try to join with profiles table if it exists
    const { data: comments, error } = await supabase
      .from("post_comments")
      .select(`
        *,
        user:profiles!post_comments_user_id_fkey (
          id,
          email
        )
      `)
      .eq("post_slug", slug)
      .order("created_at", { ascending: false });

    if (error) {
      // If profiles table doesn't exist or join fails, just get comments without user data
      const { data: commentsOnly, error: commentsError } = await supabase
        .from("post_comments")
        .select("*")
        .eq("post_slug", slug)
        .order("created_at", { ascending: false });

      if (commentsError) throw commentsError;

      // Return comments with user_id only
      const commentsWithUserId = (commentsOnly || []).map((comment) => ({
        ...comment,
        user: {
          id: comment.user_id,
          email: null,
        },
      }));

      return NextResponse.json({ comments: commentsWithUserId || [] }, { status: 200 });
    }

    // Process comments to ensure user object exists
    const processedComments = (comments || []).map((comment: any) => ({
      ...comment,
      user: comment.user || {
        id: comment.user_id,
        email: null,
      },
    }));

    return NextResponse.json({ comments: processedComments || [] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ comments: [] }, { status: 200 });
  }
}

