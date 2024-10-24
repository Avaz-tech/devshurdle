import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: useCdn, // Use CDN based on your environment
  token: process.env.SANITY_TOKEN, // Optional if dataset is public
});
