import { client } from "@sanity/lib/client";
import { Post } from "@types";
import { groq } from "next-sanity";
import Container from "@components/Container";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/image";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
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

const SlugPage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    body,
    author->
  }`;
  //================================================================================================================

  const post: Post = await client.fetch(query, { slug });
  //================================================================================================================

  return (
    <Container className="mb-10 mt-40 w-auto mx-4 xl:mx-auto max-w-screen-xl">
      <div className="flex items-center mb-10">
        <div className="w-full ">
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
            <p>No main image available</p>
          )}
        </div>
        <div className="w-1/3 hidden md:inline-flex flex-col items-center gap-5 px-4">
          {post?.author?.image ? (
            <Image
              src={urlForImage(post.author.image).url()}
              width={200}
              height={200}
              alt="author image"
              className="w-32 h-32 rounded-full object-cover"
              priority={true}
            />
          ) : (
            <p>No author image available</p>
          )}
          <p className="text-3xl text-[#5442ae] font-semibold">{post?.author?.name}</p>
          <p className="text-center tracking-wide text-sm">{post?.author?.description}</p>
          {/* Social Media Links */}
          <div className="flex items-center gap-3">{/* Links */}</div>
        </div>
      </div>
      <div>
        <PortableText value={post?.body} components={RichText} />
      </div>
    </Container>
  );
};

export default SlugPage;
