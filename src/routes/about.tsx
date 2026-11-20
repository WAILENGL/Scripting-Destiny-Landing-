import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/about")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      hash: "how",
    });
  },
  head: () => ({
    meta: [
      { title: "About — Scripting Destiny" },
      { name: "description", content: "Know your nature. Time your moves. Discover modern, secular BaZi for strategic life and career timing." },
      { httpEquiv: "refresh", content: "0;url=/#how" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: AboutRedirect,
});

function AboutRedirect() {
  useEffect(() => {
    window.location.replace("/#how");
  }, []);

  return null;
}
