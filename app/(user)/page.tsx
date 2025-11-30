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

  // Derive unique categories from posts
  // Derive unique categories from posts, filtering out null/undefined
  // const categories: Post['categories'][number][] = [
  //   ...new Map(
  //     posts
  //       .flatMap((post) => post.categories.filter((category): category is NonNullable<typeof category> => category !== null && category !== undefined))
  //       .map((category) => [category._id, category])
  //   ).values(),
  // ];

  // Select featured posts (first 3 posts)
  const featuredPosts = posts.slice(0, 3);

  // Sample quick tips (hardcoded; consider adding to Sanity schema)
  const quickTips = [
    {
      id: 1,
      title: "Fix CORS in Node.js",
      code: `res.setHeader('Access-Control-Allow-Origin', '*');`,
    },
    {
      id: 2,
      title: "Debug React State",
      code: `console.log(JSON.stringify(state, null, 2));`,
    },
    {
      id: 3,
      title: "Optimize Docker Build",
      code: `COPY . .\nRUN npm ci --production`,
    },
  ];

  return (
    <SearchProvider posts={posts}>
      <main className="flex justify-center items-center flex-col mx-4">
        <Hero />

        <SearchPanel />

        {/* Featured Posts */}
        <section className="py-12 w-full max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Featured Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link
                key={post._id}
                href={`/posts/${post.slug.current}`}
                className="p-6 bg-card rounded-lg hover:bg-accent transition border border-border"
              >
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{post.title}</h3>
                <p className="text-muted-foreground">
                  {post.description || "Solve this common coding issue with a practical fix."}
                </p>
                <p className="text-sm text-muted-foreground mt-2">By {post.author.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-12 w-full max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Explore by Category</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* {categories.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.title.toLowerCase()}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                {category.title}
              </Link>
            ))} */}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="py-12 w-full max-w-screen-xl bg-muted">
          <div className="w-full mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Quick Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickTips.map((tip) => (
                <div key={tip.id} className="p-6 bg-card rounded-lg shadow border border-border">
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">{tip.title}</h3>
                  <pre className="bg-gray-800 dark:bg-gray-900 text-white p-4 rounded text-sm">{tip.code}</pre>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 w-full max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">About DevsHurdle</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I&apos;m a developer who&apos;s been there—spending hours debugging the same issues. DevsHurdle is my personal
            collection of practical, project-specific solutions to coding problems, built to save you time and
            frustration.
          </p>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 w-full max-w-screen-xl bg-blue-900 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-lg mb-4">Get the latest solutions and tips delivered to your inbox.</p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg text-gray-900 dark:text-gray-100 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg">Subscribe</button>
            </div>
          </div>
        </section>

        {/* Tech Stack Showcase */}
        <section className="py-12 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Technologies We Cover</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["React", "Node.js", "Python", "Docker", "TypeScript", "Next.js"].map((tech) => (
              <div key={tech} className="px-4 py-2 bg-secondary rounded-full text-secondary-foreground">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Blog Content */}
        <BlogContent posts={posts} />
      </main>
    </SearchProvider>
  );
}
