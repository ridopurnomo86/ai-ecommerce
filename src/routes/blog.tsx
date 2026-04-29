import { createFileRoute } from "@tanstack/react-router";
import BlogView from "@/views/Blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog Skincare — Tips & Review Terbaik | GlowFind" },
      {
        name: "description",
        content:
          "Tips skincare, review produk, dan panduan kecantikan terpercaya dari tim GlowFind.",
      },
    ],
  }),
  component: BlogView,
});
