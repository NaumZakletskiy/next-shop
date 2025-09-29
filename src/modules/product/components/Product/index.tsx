import { FC } from "react";
import { PRODUCT_QUERYResult } from "@/sanity/types";

interface IParams {
  product: PRODUCT_QUERYResult;
}

export const Product: FC<IParams> = ({ product }) => {
  if (!product) {
    return <>Product not found.</>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 w-full rounded-xl overflow-hidden bg-gray-50">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title || ""}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-96 text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="text-gray-700">{product.description}</p>

            <p className="text-lg">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Availability:</span>{" "}
              {product.availability ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>

            <p className="text-2xl font-bold text-black-600">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
