import { defineQuery } from "next-sanity";

export const CATEGORIES_QUERY = defineQuery(
  `array::unique(*[_type == "product" && defined(category)].category)`
);
