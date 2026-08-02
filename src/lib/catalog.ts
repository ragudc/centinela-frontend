import { graphqlRequest } from "./graphql-client";
import type { Category, Product } from "./types";

const PRODUCT_FIELDS = `
  id sku name brandLine description indications
  price { amount currency }
  stockStatus
  category { slug name description }
  imageUrl
`;

export async function getCategories(): Promise<Category[]> {
  const data = await graphqlRequest<{ categories: Category[] }>(
    `query { categories { slug name description } }`,
  );
  return data.categories;
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const data = await graphqlRequest<{ products: Product[] }>(
    `query($categorySlug: String) { products(categorySlug: $categorySlug) { ${PRODUCT_FIELDS} } }`,
    { categorySlug },
  );
  return data.products;
}

export async function getProductBySku(sku: string): Promise<Product | null> {
  const data = await graphqlRequest<{ product: Product | null }>(
    `query($sku: String!) { product(sku: $sku) { ${PRODUCT_FIELDS} } }`,
    { sku },
  );
  return data.product;
}
