import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";
import { Post } from "@types";
import BlogContent from "@components/BlogContent";
import Container from "@components/Container";
import SearchPanel from "@components/SearchPanel";
import { SearchProvider } from "@app/Context/SearchContext";
import Link from "next/link";

export const metadata = {
  title: "Blog - DevsHurdle",
  description: "Browse all our coding solutions and tutorials",
};

export const revalidate = 30;

const postsQuery = groq`*[_type == "post"]{
  ...,
  author ->,
  categories[] ->
} | order(_createdAt desc)`;

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(postsQuery);

  return (
    <SearchProvider posts={posts}>
      <main className="flex justify-center items-center flex-col">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-mainColor/15 to-transparent pt-24 pb-16 px-4">
          <Container className="mx-auto">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                All Solutions & Tutorials
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Explore our complete collection of practical coding solutions, tutorials, and best practices. Find
                answers to your development challenges using our search and filtering tools.
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{posts.length}</span> total solutions available
              </p>
            </div>
          </Container>
        </section>

        {/* Search & Filter Section */}
        <section className="w-full py-12 px-4 bg-gradient-to-b from-mainColor/10 to-transparent border-b border-border">
          <Container className="mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Find What You Need</h2>
              <p className="text-muted-foreground">Search all {posts.length} solutions or browse by category</p>
            </div>
            <SearchPanel />
          </Container>
        </section>

        {/* Posts Grid */}
        <section className="w-full py-16 px-4">
          <Container className="mx-auto">
            {posts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wide font-semibold">
                  {posts.length} Articles Available
                </p>
                <BlogContent posts={posts} />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground mb-4">No posts found yet</p>
                <Link
                  href="/"
                  className="text-mainColor hover:text-mainColor/80 font-semibold underline transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            )}
          </Container>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 px-4 bg-gradient-to-r from-mainColor/10 to-mainColor/5 border-t border-border">
          <Container className="mx-auto">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Discover the perfect solution</h2>
              <p className="text-muted-foreground text-base">
                Use the search and filter tools above to find solutions tailored to your needs
              </p>
            </div>
          </Container>
        </section>
      </main>
    </SearchProvider>
  );
}
