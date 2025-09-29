import { defineQuery } from "next-sanity";

export const RELATED_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product" &&
  category == $category &&
  slug.current != $slug
] | order(_createdAt desc)[0...4] {
  _id,
  title,
  price,
  "imageUrl": image.asset->url,
  slug
}`);
