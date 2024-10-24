/* eslint-disable @next/next/no-async-client-component */
// "use client"
import BlogContent from "@components/BlogContent";
// import Hero from "@components/Hero";
import SearchPanel from "@components/SearchPanel";
import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";
import { SearchProvider} from "@app/Context/SearchContext";

//================================================================================================================
//Page revalidation time so that paage content would get updated every 30 seconds
export const revalidate = 30;
//================================================================================================================
// GROQ query to fetch all posts
const query = groq`*[_type == "post"]{
  ...,
  author ->,
    categories[] ->
} | order(_createdAt asc)`;
//================================================================================================================
export default async function Home() {
  const post_all = await client.fetch(query);

  return (
    <SearchProvider posts={post_all}>
      <main className="h-full flex justify-center items-center flex-col mx-4">
      {/* <Hero /> */}
      <SearchPanel />
      <BlogContent posts={post_all} />
    </main>
    </SearchProvider>
  );
};
