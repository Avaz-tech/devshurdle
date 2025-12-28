import { Metadata } from "next";
import { client } from "@sanity/lib/client";
import { Post } from "@types";
import { groq } from "next-sanity";
import Container from "@components/Container";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { RichText } from "@components/RichText";
import { FaCalendarDay, FaClock } from "react-icons/fa";
import Link from "next/link";
import Breadcrumb from "@components/Breadcrumb";
import { FiArrowLeft } from "@node_modules/react-icons/fi";
import LikeButton from "@components/LikeButton";
import CommentsSection from "@components/CommentsSection";
import PostViewTracker from "@components/PostViewTracker";
import PageLayout from "@components/PageLayout";

//================================================================================================================

interface Props {
  params: {
    slug: string;
  };
}
//================================================================================================================
//Page revalidation time so that page content would get updated every 30 seconds
export const revalidate = 30;
//================================================================================================================

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'post']{
    slug
  }`;

  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug?.slug?.current);
  return slugRoutes?.map((slug) => ({
    slug,
  }));
};
//================================================================================================================
// add meta datas
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    title,
    description,
    mainImage,
    "imageUrl": mainImage.asset->url
  }`;

  const post = await client.fetch(query, { slug: slug });

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.description || `Read the post titled "${post.title}"`,
    openGraph: {
      title: post.title,
      description: post.description || `Read the post titled "${post.title}"`,
      images: [
        {
          url: post.imageUrl || "/images/devshurdle_landing.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
};
//================================================================================================================

const SlugPage = async ({ params }: Props) => {
  const { slug } = await params;

  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    body,
    author->,
    categories[]->
  }`;

  // Get related posts (same categories, exclude current)
  const relatedPostsQuery = groq`*[_type == 'post' && slug.current != $slug && count(categories[@._ref in $categoryIds]) > 0] | order(_createdAt desc) [0..2] {
    _id,
    title,
    slug,
    description,
    mainImage,
    _createdAt,
    categories[]->
  }`;

  const post: Post = await client.fetch(query, { slug });

  // Get related posts
  const categoryIds = post?.categories?.map((cat: any) => cat._id).filter(Boolean) || [];
  const relatedPosts: Post[] =
    categoryIds.length > 0 ? await client.fetch(relatedPostsQuery, { slug, categoryIds }) : [];

  const postDate = new Date(post?._createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Estimate reading time (average 200 words per minute)
  const wordCount =
    (post?.body as unknown as any[])?.reduce((count: number, block: any) => {
      if (block._type === "block" && block.children) {
        return (
          count +
          block.children.reduce(
            (childCount: number, child: any) => childCount + (child.text?.split(/\s+/).length || 0),
            0,
          )
        );
      }
      return count;
    }, 0) || 0;
  const readingTime = Math.ceil(wordCount / 200);
  //================================================================================================================

  return (
    <>
      <PostViewTracker slug={slug} />
      <PageLayout>
        {/* Article Container */}
        <article className="w-full pb-16">
        <Container className="mx-4 xl:mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post?.title || "Post" },
              ]}
            />

            {/* Article Header - Compact and Scannable */}
            <header className="mb-8">
              {/* Categories */}
              {post?.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category: any) => (
                    <Link
                      key={category._id}
                      href={`/blog?category=${category.title.toLowerCase()}`}
                      className="inline-block px-3 py-1 bg-mainColor/10 hover:bg-mainColor/20 text-mainColor text-xs font-semibold rounded-full border border-mainColor/20 hover:border-mainColor/30 transition-all duration-200"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                {post?.title}
              </h1>

              {/* Description if available */}
              {post?.description && (
                <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">{post.description}</p>
              )}

              {/* Meta Information Row */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-6 border-b border-border">
                {/* Author */}
                <div className="flex items-center gap-3">
                  {post?.author?.image ? (
                    <Image
                      src={urlForImage(post.author.image).url()}
                      width={40}
                      height={40}
                      alt={post.author.name || "Author"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-mainColor/20"
                      style={{ width: "auto", height: "auto" }}
                      priority={true}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-mainColor/20 flex items-center justify-center">
                      <span className="text-mainColor font-semibold text-sm">
                        {post?.author?.name?.charAt(0).toUpperCase() || "A"}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground text-sm">{post?.author?.name || "Author"}</p>
                    <p className="text-xs text-muted-foreground">Author</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block h-4 w-px bg-border"></div>

                {/* Date & Reading Time */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaCalendarDay className="text-mainColor" size={14} />
                    <span className="text-sm text-muted-foreground">{postDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-mainColor" size={14} />
                    <span className="text-sm text-muted-foreground">{readingTime} min read</span>
                  </div>
                </div>

                {/* Like Button */}
                <div className="flex items-center gap-2 pt-2">
                  <LikeButton postSlug={slug} size="md" />
                </div>
              </div>
            </header>

            {/* Featured Image - Smaller, Inline with Content */}
            {post?.mainImage && (
              <figure className="mb-10 -mx-4 md:mx-0">
                <Image
                  src={urlForImage(post.mainImage).url()}
                  width={1200}
                  height={600}
                  alt={post.title}
                  priority={true}
                  className="w-full h-auto rounded-xl object-cover shadow-lg border border-border"
                  style={{ width: "auto", height: "auto" }}
                />
              </figure>
            )}

            {/* Article Content */}
            <div className="article-content">
              <PortableText value={post?.body} components={RichText} />
            </div>

            {/* Comments Section */}
            <CommentsSection postSlug={slug} />

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-border space-y-8">
              {/* Categories/Tags */}
              {post?.categories && post.categories.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category: any) => (
                      <Link
                        key={category._id}
                        href={`/blog?category=${category.title.toLowerCase()}`}
                        className="px-4 py-2 bg-mainColor/10 hover:bg-mainColor/20 text-mainColor text-sm font-medium rounded-full border border-mainColor/20 hover:border-mainColor/30 transition-all duration-200"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              {post?.author && (
                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {post.author.image && (
                      <Image
                        src={urlForImage(post.author.image).url()}
                        width={80}
                        height={80}
                        alt={post.author.name || "Author"}
                        className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-mainColor/20"
                        style={{ width: "auto", height: "auto" }}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">About {post.author.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        Passionate developer sharing practical solutions and insights to help you overcome coding
                        challenges.
                      </p>
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-mainColor hover:text-mainColor/80 font-medium text-sm transition-colors"
                      >
                        View more articles
                        <FiArrowLeft className="w-3 h-3 rotate-180" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost._id}
                        href={`/post/${relatedPost.slug?.current}`}
                        className="group p-4 bg-card rounded-lg border border-border hover:border-mainColor/50 hover:shadow-md transition-all duration-200"
                      >
                        {relatedPost.mainImage && (
                          <div className="w-full h-40 mb-3 rounded-lg overflow-hidden">
                            <Image
                              src={urlForImage(relatedPost.mainImage).url()}
                              width={400}
                              height={200}
                              alt={relatedPost.title || ""}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-mainColor transition-colors mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        {relatedPost.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.description}</p>
                        )}
                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <FaCalendarDay className="w-3 h-3" />
                          <span>
                            {new Date(relatedPost._createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </footer>
          </div>
        </Container>
      </article>
      </PageLayout>
    </>
  );
};

export default SlugPage;
