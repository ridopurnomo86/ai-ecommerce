import { createFileRoute, notFound } from "@tanstack/react-router";
import { blogPosts } from "@/data/products";
import BlogPostView from "@/views/BlogPost";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title} | GlowFind Blog` },
      { name: "description", content: loaderData?.post.excerpt },
    ],
  }),
  component: BlogPostView,
});
