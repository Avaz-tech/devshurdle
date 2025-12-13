import { Metadata } from "next";
import { client } from "@sanity/lib/client";
import { Post } from "@types";
import { groq } from "next-sanity";
import Container from "@components/Container";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { RichText } from "@components/RichText";
//================================================================================================================

interface Props {
  params: {
    slug: string;
  };
}
//================================================================================================================
//Page revalidation time so that paage content would get updated every 30 seconds
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
  //================================================================================================================
  const post: Post = await client.fetch(query, { slug });

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
      {/* Hero Section with Background */}
      <div className="w-full bg-gradient-to-b from-mainColor/10 to-transparent pt-32 pb-12">
        <Container className="mx-4 xl:mx-auto">
          {/* Categories */}
          {post?.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category: any) => (
                <span
                  key={category._id}
                  className="inline-block px-3 py-1 bg-mainColor/20 text-mainColor text-xs font-semibold rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {post?.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* Author Info */}
            <div className="flex items-center gap-4">
              {post?.author?.image ? (
                <Image
                  src={urlForImage(post.author.image).url()}
                  width={56}
                  height={56}
                  alt="author image"
                  className="w-14 h-14 rounded-full object-cover border-2 border-mainColor/30"
                  priority={true}
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-mainColor/20"></div>
              )}
              <div>
                <p className="font-semibold text-foreground">{post?.author?.name}</p>
                <p className="text-sm text-muted-foreground">Author</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-8 w-px bg-border"></div>

            {/* Post Metadata */}
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Published</p>
                <p className="text-foreground font-medium">{postDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Reading Time</p>
                <p className="text-foreground font-medium">{readingTime} min read</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Featured Image */}
      {post?.mainImage && (
        <div className="w-full bg-foreground/5">
          <div className="max-w-4xl mx-auto px-4 xl:px-0 py-8">
            <Image
              src={urlForImage(post.mainImage).url()}
              width={800}
              height={500}
              alt={post.title}
              priority={true}
              className="w-full h-auto rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Content Section */}
      <Container className="my-12 mx-4 xl:mx-auto">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-invert max-w-none">
            <PortableText value={post?.body} components={RichText} />
          </article>

          {/* Author Bio Section */}
          {post?.author && (
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex gap-6 p-6 bg-card rounded-lg border border-border">
                {post.author.image && (
                  <Image
                    src={urlForImage(post.author.image).url()}
                    width={80}
                    height={80}
                    alt="author"
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">About {post.author.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Passionate developer sharing practical solutions and insights.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default SlugPage;
