import { FC } from "react";
import { RELATED_PRODUCTS_QUERYResult } from "@/sanity/types";
import { ProductCard } from "../ProductCard";

interface IParams {
  products: RELATED_PRODUCTS_QUERYResult;
}

export const RelatedProducts: FC<IParams> = ({ products }) => {
  return (
    <div>
      <div className="flex items-center justify-center h-20">
        <div className="text-2xl font-bold">Related Products</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(({ _id, slug, title, price, imageUrl }) => (
          <ProductCard
            key={_id}
            slug={slug?.current}
            title={title}
            price={price}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
