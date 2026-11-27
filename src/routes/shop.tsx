import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const SHOP_URL = "https://app.scriptingdestiny.com/shop";

export const Route = createFileRoute("/shop")({
  component: ShopRedirect,
});

function ShopRedirect() {
  useEffect(() => {
    const target = `${SHOP_URL}${window.location.search}${window.location.hash}`;
    window.location.replace(target);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-6 text-center">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Redirecting to the Scripting Destiny Reports Shop…
        </p>
        <a
          href={SHOP_URL}
          className="inline-block text-sm font-medium text-accent underline underline-offset-4"
        >
          Continue to Reports Shop
        </a>
      </div>
    </main>
  );
}
