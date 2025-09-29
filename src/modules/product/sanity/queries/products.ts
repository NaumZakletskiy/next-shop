import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
]{_id, title, price, slug, "imageUrl": image.asset->url}`);
