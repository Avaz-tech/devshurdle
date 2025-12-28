import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";
import { Post } from "@types";
import BlogContent from "@components/BlogContent";
import Container from "@components/Container";
import SearchPanel from "@components/SearchPanel";
import { SearchProvider } from "@app/context/SearchContext";
import Link from "next/link";
import Breadcrumb from "@components/Breadcrumb";
import Pagination from "@components/Pagination";
import PageLayout from "@components/PageLayout";

export const metadata = {
  title: "Blog - DevsHurdle",
  description: "Browse all our coding solutions and tutorials",
};

// Make this page dynamic so searchParams (e.g. ?page=2) affect the data
export const dynamic = "force-dynamic";

const PAGE_SIZE = 9;

const paginatedPostsQuery = groq`*[_type == "post"] | order(_createdAt desc) [$offset...$end]{
  ...,
  author ->,
  categories[] ->
}`;

const totalCountQuery = groq`count(*[_type == "post"])`;

interface BlogPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export default async function BlogPage(props: BlogPageProps) {
  const resolvedSearchParams = (props.searchParams ? await props.searchParams : {}) as {
    page?: string;
  };

  const currentPage = Math.max(1, Number(resolvedSearchParams.page ?? "1") || 1);

  const totalPosts: number = await client.fetch(totalCountQuery);
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));

  const safePage = Math.min(currentPage, totalPages);
  const offset = (safePage - 1) * PAGE_SIZE;
  const end = offset + PAGE_SIZE;

  const posts: Post[] = await client.fetch(paginatedPostsQuery, { offset, end });

  return (
    <SearchProvider posts={posts}>
      <PageLayout>
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-mainColor/15 to-transparent pb-8 px-4">
          <Container className="mx-auto">
            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} noBorder={true} />
            
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                All Solutions & Tutorials
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Explore our complete collection of practical coding solutions, tutorials, and best practices. Find
                answers to your development challenges using our search and filtering tools.
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{totalPosts}</span> total solutions available
              </p>
            </div>
          </Container>
        </section>

        {/* Search & Filter Section */}
        <section className="w-full py-12 px-4 bg-gradient-to-b from-mainColor/10 to-transparent border-b border-border">
          <Container className="mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Find What You Need</h2>
              <p className="text-muted-foreground">Search all {totalPosts} solutions or browse by category</p>
            </div>
            <SearchPanel />
          </Container>
        </section>

        {/* Posts Grid */}
        <section className="w-full py-16 px-4">
          <Container className="mx-auto">
            {posts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide font-semibold">
                  Showing page {safePage} of {totalPages} ({totalPosts} articles)
                </p>
                <BlogContent posts={posts} />
                <Pagination currentPage={safePage} totalPages={totalPages} />
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
      </PageLayout>
    </SearchProvider>
  );
}
