import { Post } from "@types";
import Container from "./../components/Container";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/image";
interface Props {
  posts: Post[];
}

const BlogContent = ({ posts }: Props) => {
  return (
    <Container className="py-20 mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={{
            pathname: `/post/${post?.slug?.current}`,
            query: { slug: post?.slug?.current },
          }}
        >
          <div className=" h-full border border-mainColor border-opacity-50 flex flex-col gap-[22px] justify-between rounded-md shadow-custom-card duration-200">
            <div className="w-full h-[225px] md:w-full group overflow-hidden rounded-md relative">
              <Image
                src={urlForImage(post.mainImage).url()}
                width={200}
                height={200}
                alt="blog post image"
                className="w-full h-full object-cover group-hover:scale-105 duration-500 rounded-tl-md rounded-bl-md"
                priority={true}
              />
              <div className="absolute top-0 left-0 bg-black/20 w-full h-full group-hover:hidden duration-200" />
              <div className="absolute hidden group-hover:inline-flex bottom-0 left-0 w-full bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-mainColor p-5 justify-center duration-200">
                <p className="text-lg font-semibold">Click to Read</p>
              </div>
            </div>
            <div className="w-full grow flex flex-col gap-3 justify-between p-4">
              <div className="flex flex-col gap-5">
                {/* ------------------------------------ */}
                <div className="flex items-center gap-2 ">
                  {post?.categories?.map((item) => (
                    <p key={item._id} className="text-xs uppercase text-green-600 border rounded-full py-2 px-3 font-semibold">
                      {item?.title}
                    </p>
                  ))}
                </div>
                {/* ------------------------------------ */}
                <h2 className="text-xl font-semibold hover:text-orange-600 duration-200 cursor-pointer">{post?.title}</h2>
                {/* ------------------------------------ */}
                {/* <p className="text-gray-500">{post?.description}</p> */}
                {/* ------------------------------------ */}
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm font-semibold text-gray-500">
                  {new Date(post?._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    src={urlForImage(post?.author?.image).url()}
                    width={200}
                    height={200}
                    alt="author image"
                    className="rounded-full object-cover w-10 h-10"
                    priority={true}
                  />
                  <p className="text-sm font-medium">{post?.author?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Container>
  );
};

export default BlogContent;