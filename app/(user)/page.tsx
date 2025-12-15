import Hero from "@components/Hero";
import SearchPanel from "@components/SearchPanel";
import BlogContent from "@components/BlogContent";
import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";
import { SearchProvider } from "@app/Context/SearchContext";
import Link from "next/link";
import { Post } from "./../../types";

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
      <main className="flex justify-center items-center flex-col">
        {/* Hero Section */}
        <Hero />

        {/* Integrated Search + Filter Section */}
        <section className="w-full py-12 px-4 bg-gradient-to-b from-mainColor/10 to-transparent border-b border-border">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Find Solutions Fast</h2>
              <p className="text-muted-foreground">Search by keywords or filter by category</p>
            </div>
            <SearchPanel />
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="w-full py-16 px-4 bg-gradient-to-br from-mainColor/5 to-transparent">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-3">Featured Solutions</h2>
              <p className="text-muted-foreground text-lg">Handpicked solutions to common coding challenges</p>
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
                    <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-mainColor transition-colors">
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
          </div>
        </section>

        {/* Categories Section */}
        {uniqueCategories.length > 0 && (
          <section className="w-full py-16 px-4">
            <div className="max-w-screen-xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-3">Browse by Category</h2>
                <p className="text-muted-foreground text-lg">Explore solutions organized by topic</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {uniqueCategories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/blog?category=${category.title.toLowerCase()}`}
                    className="px-5 py-2.5 bg-card border border-border rounded-full hover:border-mainColor hover:bg-mainColor/5 text-foreground font-medium transition-all duration-200 text-sm"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="w-full py-16 px-4 bg-gradient-to-r from-mainColor/10 to-mainColor/5">
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Need a Specific Solution?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Search through our collection of practical coding fixes and tutorials
            </p>
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-mainColor hover:bg-mainColor/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Explore All Solutions
            </Link>
          </div>
        </section>

        {/* Blog Content - All Posts */}
        <section className="w-full py-16 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-3">Latest Articles</h2>
              <p className="text-muted-foreground text-lg">Stay updated with the newest solutions and tips</p>
            </div>
            <BlogContent posts={posts} />
          </div>
        </section>

        {/* About Section */}
        <section className="w-full py-16 px-4 bg-card/50">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">About DevsHurdle</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  I&apos;m a developer who&apos;s been there—spending hours debugging the same issues. DevsHurdle is my
                  personal collection of practical, project-specific solutions to coding problems.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Built to save you time and frustration, every solution here is tested, documented, and ready to use.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-background rounded-lg border border-border">
                  <p className="text-3xl font-bold text-mainColor mb-2">{posts.length}+</p>
                  <p className="text-foreground font-semibold">Solutions</p>
                </div>
                <div className="p-6 bg-background rounded-lg border border-border">
                  <p className="text-3xl font-bold text-mainColor mb-2">{uniqueCategories.length}</p>
                  <p className="text-foreground font-semibold">Categories</p>
                </div>
                <div className="p-6 bg-background rounded-lg border border-border">
                  <p className="text-3xl font-bold text-mainColor mb-2">100%</p>
                  <p className="text-foreground font-semibold">Practical</p>
                </div>
                <div className="p-6 bg-background rounded-lg border border-border">
                  <p className="text-3xl font-bold text-mainColor mb-2">Open</p>
                  <p className="text-foreground font-semibold">Source</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-16 px-4 bg-gradient-to-r from-mainColor to-mainColor/80 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-white/90 text-lg mb-8">
              Get the latest solutions and tips delivered to your inbox every week
            </p>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-200 border border-white/30">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
    </SearchProvider>
  );
}
