import Hero from "@components/Hero";
import SearchPanel from "@components/SearchPanel";
import BlogContent from "@components/BlogContent";
import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";
import { SearchProvider } from "@app/context/SearchContext";
import Link from "next/link";
import { Post } from "./../../types";
import PageLayout from "@components/PageLayout";
import Section from "@components/Section";

// GROQ query for posts
const postsQuery = groq`*[_type == "post"]{
  ...,
  author ->,
  categories[] ->
} | order(_createdAt desc)`;

// Page revalidation time
export const revalidate = 30;

export default async function Home() {
  const posts: Post[] = await client.fetch(postsQuery);

  // Select featured posts (first 3 posts)
  const featuredPosts = posts.slice(0, 3);

  // Get unique categories from all posts
  const uniqueCategories = [
    ...new Map(
      posts
        .flatMap((post) => post.categories || [])
        .filter((category) => category !== null && category !== undefined)
        .map((category) => [category._id, category]),
    ).values(),
  ].slice(0, 6);

  return (
    <SearchProvider posts={posts}>
      <PageLayout>
        {/* Hero Section */}
        <Hero />

        {/* Featured Posts Section - Moved up and made more compact */}
        <Section className="bg-gradient-to-b from-mainColor/5 to-transparent">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Featured Solutions</h2>
            <p className="text-muted-foreground">Handpicked solutions to common coding challenges</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link
                key={post._id}
                href={`/post/${post.slug.current}`}
                className="group relative p-6 bg-card rounded-xl border border-border hover:border-mainColor/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mainColor/0 to-mainColor/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-mainColor transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {post.description || "A practical solution to improve your development workflow."}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">By {post.author?.name}</p>
                    <span className="text-mainColor font-semibold text-sm">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Search Section - Made more prominent */}
        <Section
          id="search-section"
          className="bg-gradient-to-b from-card to-background border-y border-border"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Find Your Solution</h2>
            <p className="text-muted-foreground">Search by keywords or filter by category</p>
          </div>
          <SearchPanel />
        </Section>

        {/* Blog Content - Recent posts with result indicator */}
        <Section id="results-section">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Latest Solutions</h2>
              <p className="text-muted-foreground">
                Showing the most recent posts. Visit the blog page to explore all solutions.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-mainColor hover:text-mainColor/80 font-semibold text-sm"
            >
              View all posts →
            </Link>
          </div>
          <BlogContent posts={posts} limit={6} />
        </Section>

        {/* Categories Section - Moved below results */}
        {uniqueCategories.length > 0 && (
          <Section className="bg-card/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Browse by Category</h2>
              <p className="text-muted-foreground">Explore solutions organized by topic</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {uniqueCategories.map((category) => (
                <Link
                  key={category._id}
                  href={`/blog?category=${category.title.toLowerCase()}`}
                  className="px-6 py-3 bg-card border border-border rounded-full hover:border-mainColor hover:bg-mainColor/5 text-foreground font-medium transition-all duration-200 text-sm hover:shadow-md"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* About Section */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">About DevsHurdle</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I&apos;m a developer who&apos;s been there—spending hours debugging the same issues. DevsHurdle is my
                personal collection of practical, project-specific solutions to coding problems.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Built to save you time and frustration, every solution here is tested, documented, and ready to use.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-mainColor hover:text-mainColor/80 font-semibold transition-colors"
              >
                Learn More →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <p className="text-3xl font-bold text-mainColor mb-2">{posts.length}+</p>
                <p className="text-foreground font-semibold">Solutions</p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <p className="text-3xl font-bold text-mainColor mb-2">{uniqueCategories.length}</p>
                <p className="text-foreground font-semibold">Categories</p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <p className="text-3xl font-bold text-mainColor mb-2">100%</p>
                <p className="text-foreground font-semibold">Practical</p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <p className="text-3xl font-bold text-mainColor mb-2">Open</p>
                <p className="text-foreground font-semibold">Source</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Newsletter Section */}
        <Section className="bg-gradient-to-r from-mainColor/5 to-mainColor/10 border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">Get notified when new solutions are added</p>
            <div className="flex gap-2 flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-mainColor/20 border border-border"
              />
              <button className="px-6 py-3 bg-mainColor hover:bg-mainColor/90 text-white font-semibold rounded-lg transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </Section>
      </PageLayout>
    </SearchProvider>
  );
}
