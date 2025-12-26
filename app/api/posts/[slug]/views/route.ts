import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();
    
    // Get user if authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Get IP address from request headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";

    // Insert view (will be ignored if duplicate due to unique constraint)
    const { error } = await supabase.from("post_views").insert({
      post_slug: slug,
      user_id: user?.id || null,
      ip_address: ip,
    });

    if (error && error.code !== "23505") {
      // 23505 is unique violation, which is expected for duplicate views
      console.error("Error tracking view:", error);
    }

    // Get total view count
    const { count } = await supabase
      .from("post_views")
      .select("*", { count: "exact", head: true })
      .eq("post_slug", slug);

    return NextResponse.json({ views: count || 0 }, { status: 200 });
  } catch (error) {
    console.error("Error in views route:", error);
    return NextResponse.json({ error: "Failed to track view" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const { count } = await supabase
      .from("post_views")
      .select("*", { count: "exact", head: true })
      .eq("post_slug", slug);

    return NextResponse.json({ views: count || 0 }, { status: 200 });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json({ views: 0 }, { status: 200 });
  }
}

