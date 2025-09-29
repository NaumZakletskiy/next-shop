"use client";

import { FC, useState } from "react";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY } from "../../sanity/queries";
import { ProductCard } from "../../components";
import { Input, CheckboxDropdown, SortSelect } from "@/common/components";
import { useQuery } from "@tanstack/react-query";
import { CONSTANTS } from "@/common/constants";
import { useDebounce } from "@/common/hooks";
import { SortOrder } from "@/modules/common/enums";
import { IProduct } from "../../interfaces";

interface IGetProductParams {
  searchText: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sortOrder: SortOrder | null;
}

async function fetchProducts(params: IGetProductParams) {
  const query = `*[
  _type == "product" 
  ${params.searchText && `&& (!defined($searchText) || title match $searchText)`} 
  ${params.categories.length ? `&& category in $categories` : ""}
  && price >= $minPrice
  && price <= $maxPrice
]${params.sortOrder ? `| order(price ${params.sortOrder})` : ``}{_id, title, price, slug, "imageUrl": image.asset->url}`;

  return client.fetch(query, {
    ...params,
    searchText: params.searchText ? `*${params.searchText}*` : undefined,
  });
}

export function useProducts(params: IGetProductParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
  });
}

export const ProductListPage: FC = () => {
  const [searchText, setSearchText] = useState("");
  const { debouncedValue } = useDebounce(searchText);

  const [categories, setCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);

  const [minPrice, setMinPrice] = useState<string | null>(null);
  const debouncedMinPrice = useDebounce(minPrice);

  const [maxPrice, setMaxPrice] = useState<string | null>(null);
  const debouncedMaxPrice = useDebounce(maxPrice);

  const { data: fetchedCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => client.fetch(CATEGORIES_QUERY),
  });

  const {
    data: productsData,
    isLoading,
    isError,
  } = useProducts({
    searchText: debouncedValue || "",
    categories: categories,
    maxPrice: Number(
      debouncedMaxPrice.debouncedValue || CONSTANTS.DEFAULT_MAX_PRICE
    ),
    minPrice: Number(
      debouncedMinPrice.debouncedValue || CONSTANTS.DEFAULT_MIN_PRICE
    ),
    sortOrder,
  });
  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">Error loading products</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <Input
            value={searchText}
            onChange={setSearchText}
            placeholder="Search"
            className="w-2xl"
          />
          <CheckboxDropdown
            options={
              fetchedCategories
                ? fetchedCategories.map((category) => {
                    return category ? { label: category, value: category } : null;
                  }).filter(category => !!category)
                : []
            }
            onChange={setCategories}
            selected={categories}
            placeholder="Select Category"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <Input
            value={minPrice}
            onChange={setMinPrice}
            placeholder="Min price"
            className="w-30"
          />
          <Input
            value={maxPrice}
            onChange={setMaxPrice}
            placeholder="Max price"
            className="w-30"
          />
          <div className="ml-30">Sort by price: </div>
          <SortSelect sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
      </div>
      {isLoading ? (
        <div className="p-8 text-center">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsData.map(
            ({ _id, slug, title, price, imageUrl }: IProduct) => (
              <ProductCard
                key={_id}
                slug={slug.current}
                title={title}
                price={price}
                imageUrl={imageUrl}
              />
            )
          )}
          {productsData.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-20">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
