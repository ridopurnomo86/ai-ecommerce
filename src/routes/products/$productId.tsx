import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProductById, getRelatedProducts } from "@/lib/search";
import ProductDetail from "@/views/product/ProductDetail";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = getProductById(params.productId);
    if (!product) throw notFound();
    const related = getRelatedProducts(product, 4);
    return { product, related };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} | GlowFind` },
      { name: "description", content: loaderData?.product.description },
    ],
  }),
  component: ProductDetail,
});
