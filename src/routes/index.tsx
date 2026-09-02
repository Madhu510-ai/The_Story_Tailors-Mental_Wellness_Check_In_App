import { createFileRoute, redirect } from "@tanstack/react-router";

// The dashboard is a standalone HTML/CSS/vanilla-JS app served from /public.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/dashboard/index.html" });
  },
  component: () => null,
});
