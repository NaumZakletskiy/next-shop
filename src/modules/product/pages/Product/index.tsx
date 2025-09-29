import { PRODUCT_QUERY, RELATED_PRODUCTS_QUERY } from "../../sanity/queries";
import { Product, RelatedProducts } from "../../components";
import { client } from "@/sanity/lib/client";

export async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = await client.fetch(PRODUCT_QUERY, { slug });

  if (!product) {
    return <>Product Not Found</>;
  }

  const relatedProducts = await client.fetch(RELATED_PRODUCTS_QUERY, {
    slug,
    category: product.category,
  });

  return (
    <>
      <Product product={product} />
      <RelatedProducts products={relatedProducts || []} />
    </>
  );
}
