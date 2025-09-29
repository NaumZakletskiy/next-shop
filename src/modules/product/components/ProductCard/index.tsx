import { FC } from "react";
import Link from "next/link";

interface IParams {
  title: string | null;
  slug: string | undefined | null;
  price: number | null;
  imageUrl: string | null;
}
export const ProductCard: FC<IParams> = ({ title, slug, price, imageUrl }) => {
  return (
    <Link
      href={`/product/${slug}`}
      className="group block rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md max-w-sm "
    >
      <div className="h-64 w-full overflow-hidden rounded-t-xl bg-gray-50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || ""}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
          {title}
        </h3>
        <p className="mt-2 text-gray-600">${price}</p>
      </div>
    </Link>
  );
};
