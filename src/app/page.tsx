"use client";

import { ProductListPage as ProductList } from "@/modules/product/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
const ProductListPage = () => {
  return (
    <QueryClientProvider client={client}>
      <ProductList />
    </QueryClientProvider>
  );
};

export default ProductListPage;
