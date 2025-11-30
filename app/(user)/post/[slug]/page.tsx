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
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    title,
    description,
    mainImage,
    "imageUrl": mainImage.asset->url
  }`;

  const post = await client.fetch(query, { slug: params.slug });

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

const SlugPage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    body,
    author->
  }`;
  //================================================================================================================
  const post: Post = await client.fetch(query, { slug });

  const postDate = new Date(post?._createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
  //================================================================================================================

  return (
    <Container className="mb-10 mt-40 w-auto mx-4 xl:mx-auto">
      <div className="flex flex-col items-start mb-10">
        <h2 className="text-3xl py-2 md:text-[40px] font-bold text-foreground">{post?.title}</h2>
        {/* -------------- post main image --------------- */}
        <div className="w-1/5 hidden md:w-full md:inline-flex flex-row items-center gap-5 p-4">
          {post?.author?.image ? (
            <Image
              src={urlForImage(post.author.image).url()}
              width={200}
              height={200}
              alt="author image"
              className="w-16 h-16 rounded-full object-cover"
              priority={true}
            />
          ) : (
            <p className="text-muted-foreground">No author image available</p>
          )}
          <div className="flex flex-col w-full">
            <p className=" text-mainColor font-semibold">By: {post?.author?.name}</p>
            <p className="tracking-wide text-sm text-muted-foreground">Posted on {postDate}</p>
          </div>
          {/* Social Media Links */}
          <div className="flex items-center gap-3">{/* Links */}</div>
        </div>
        {/* --------------author info--------------- */}
        <div className="w-full">
          {post?.mainImage ? (
            <Image
              src={urlForImage(post.mainImage).url()}
              width={500}
              height={500}
              alt="main image"
              priority={true}
              className="object-cover w-full"
            />
          ) : (
            <p className="text-muted-foreground">No main image available</p>
          )}
        </div>
      </div>
      <div>
        <PortableText value={post?.body} components={RichText} />
      </div>
    </Container>
  );
};

export default SlugPage;
