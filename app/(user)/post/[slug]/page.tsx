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
  console.log(post);
  //================================================================================================================

  return (
    <Container className="mb-10 ">
      <div className="flex items-center mb-10">
        <div className="w-full md:w-2/3">
          <Image src={urlForImage(post?.mainImage).url()} width={500} height={500} alt="main image" priority={true} className="object-cover w-full" />
        </div>
        <div className="w-1/3 hidden md:inline-flex flex-col items-center gap-5 px-4  ">
          <Image
            src={urlForImage(post?.author?.image).url()}
            width={200}
            height={200}
            alt="author image"
            className="w-32 h-32 rounded-full object-cover"
            priority={true}
          />
          <p className="text-3xl text-[#5442ae] font-semibold">{post?.author?.name}</p>
          <p className="text-center tracking-wide text-sm">{post?.author?.description}</p>
          {/* Need to put social media icons/links in necesssary */}
          <div className="flex items-center gap-3">
            <Link
              href={"htts://www.instagram.com"}
              className="w-10 h-10 bg-gray-600   text-xl rounded-full flex
             justify-center items-center hover:bg-[#5442ae] duration-200"
            >
              <FaGithub />
            </Link>
            <Link
              href={"htts://www.instagram.com"}
              className="w-10 h-10 bg-[#bc1888]   text-xl rounded-full flex
             justify-center items-center hover:bg-[#5442ae] duration-200"
            >
              <FaInstagram />
            </Link>
            <Link
              href={"htts://www.instagram.com"}
              className="w-10 h-10 bg-blue-500   text-xl rounded-full flex
             justify-center items-center hover:bg-[#5442ae] duration-200"
            >
              <FaFacebookF />
            </Link>
            <Link
              href={"htts://www.instagram.com"}
              className="w-10 h-10 bg-red-500   text-xl rounded-full flex
              justify-center items-center hover:bg-[#5442ae] duration-200"
            >
              <FaYoutube />
            </Link>
            <Link
              href={"htts://www.instagram.com"}
              className="w-10 h-10 bg-cyan-600   text-xl rounded-full flex
             justify-center items-center hover:bg-[#5442ae] duration-200"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className=" font-sans">
        <PortableText value={post?.body}  components={RichText} />
      </div>
    </Container>
  );
};

export default SlugPage;
