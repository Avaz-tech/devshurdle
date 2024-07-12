import BlogContent from "@components/BlogContent";
import Hero from "@components/Hero";
import SearchPanel from "@components/SearchPanel";
import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";

//================================================================================================================
//Page revalidation time so that paage content would get updated every 30 seconds
export const revalidate = 30;
//================================================================================================================
const query = groq`*[_type == "post"]{
  ...,
  author ->,
    categories[] ->
} | order(_createdAt asc)`;
//================================================================================================================
export default async function Home() {
  const post = await client.fetch(query);
  console.log(post);
  return (
    <main className="h-full flex justify-center items-center flex-col mx-4">
      {/* <Hero /> */}
      <SearchPanel />
      <BlogContent posts={post} />
    </main>
  );
}
//================================================================================================================
