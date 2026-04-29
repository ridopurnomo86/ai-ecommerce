import { createFileRoute } from "@tanstack/react-router";
import AdminView from "@/views/Admin";

export const Route = createFileRoute("/admin")({
  component: AdminView,
});
