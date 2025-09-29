import { defineQuery } from "next-sanity";

export const PRODUCT_QUERY =
  defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  title, body, "imageUrl": image.asset->url, category, description, availability, price
}`);
