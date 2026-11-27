import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { ShopPage } from "@/shop/ShopPage";
import { CheckoutReturn } from "@/shop/CheckoutReturn";
import { consumeCheckoutReturn, type CheckoutOutcome } from "@/shop/orders";

const TITLE = "BaZi Reports & 1-on-1 Consultations — Scripting Destiny";
const DESC =
  "Commission your True Solar Time BaZi Blueprint, Full Reading PDF, or 7-Day Private Email Consultation with Lead Analyst Blake Leung.";

export const Route = createFileRoute("/shop")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { intake?: string; checkout?: string; tier?: string } => ({
    intake: typeof search.intake === "string" ? search.intake : undefined,
    checkout: typeof search.checkout === "string" ? search.checkout : undefined,
    tier: typeof search.tier === "string" ? search.tier : undefined,
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ShopRoutePage,
});

function ShopRoutePage() {
  const { intake } = Route.useSearch();
  const [checkoutReturn, setCheckoutReturn] = useState<{
    outcome: CheckoutOutcome;
    intakeId: string;
  } | null>(() => {
    if (typeof window === "undefined") return null;
    return consumeCheckoutReturn();
  });

  const handleCloseReturn = () => {
    setCheckoutReturn(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("checkout");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-main flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border-main bg-bg-dark/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link
            to="/"
            aria-label="Scripting Destiny home"
            className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90"
          >
            <img src={logo} alt="Scripting Destiny" className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/survey"
              className="hidden sm:inline-block text-xs font-medium text-text-dim hover:text-brand-gold transition-colors"
            >
              Free Blueprint
            </Link>
            <a
              href="https://app.scriptingdestiny.com/"
              className="text-xs font-medium text-text-dim hover:text-brand-gold transition-colors"
            >
              BaZi Calculator
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Shop */}
      <div className="flex-1">
        <ShopPage initialIntakeId={intake ?? null} surveyUrl="/survey" />
      </div>

      {/* Stripe Checkout Return Modal */}
      {checkoutReturn && (
        <CheckoutReturn
          outcome={checkoutReturn.outcome}
          intakeId={checkoutReturn.intakeId}
          onClose={handleCloseReturn}
        />
      )}
    </div>
  );
}
