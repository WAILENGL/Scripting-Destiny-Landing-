import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Download, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const API_BASE = "https://app.scriptingdestiny.com";

export const Route = createFileRoute("/download")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { intake?: string; type?: string; tier?: string } => ({
    intake: typeof search.intake === "string" ? search.intake : undefined,
    type: typeof search.type === "string" ? search.type : undefined,
    tier: typeof search.tier === "string" ? search.tier : undefined,
  }),
  head: () => ({
    meta: [{ title: "Download Your BaZi Reading — Scripting Destiny" }],
  }),
  component: DownloadReportPage,
});

function DownloadReportPage() {
  const { intake, type, tier } = Route.useSearch();
  const isValidIntake = Boolean(intake && /^[0-9a-f]{16,64}$/i.test(intake));
  const pdfUrl = isValidIntake
    ? type === "free"
      ? `${API_BASE}/api/orders/${encodeURIComponent(intake!)}/free.pdf`
      : `${API_BASE}/api/orders/${encodeURIComponent(intake!)}/report.pdf${tier ? `?tier=${encodeURIComponent(tier)}` : ""}`
    : null;

  useEffect(() => {
    if (!pdfUrl) return;
    const timer = setTimeout(() => {
      window.location.href = pdfUrl;
    }, 350);
    return () => clearTimeout(timer);
  }, [pdfUrl]);

  return (
    <main className="min-h-screen bg-bg-dark text-text-main flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md rounded-sm border border-border-main bg-bg-panel p-8 space-y-5 shadow-2xl">
        <Link to="/" className="inline-block">
          <img src={logo} alt="Scripting Destiny" className="h-8 w-auto mx-auto" />
        </Link>

        {pdfUrl ? (
          <>
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-normal text-text-main">
                Your BaZi Reading is Ready
              </h1>
              <p className="text-sm text-text-dim leading-relaxed">
                Your PDF download should begin automatically. If it doesn&apos;t start within a few
                seconds, click the button below.
              </p>
            </div>
            <a
              href={pdfUrl}
              className="w-full min-h-[48px] px-5 rounded-sm bg-brand-gold text-bg-dark font-semibold text-sm inline-flex items-center justify-center gap-2 hover:brightness-105 transition-all"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download Your Reading (PDF)</span>
            </a>
            <div className="pt-2 border-t border-border-main/60">
              <Link
                to="/shop"
                search={{ intake }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-gold hover:underline"
              >
                <span>View upgrades &amp; 1-on-1 consultations</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <h1 className="font-display text-2xl font-normal text-text-main">
              Download Link Incomplete
            </h1>
            <p className="text-sm text-text-dim">
              Please open the full download link from your Scripting Destiny email, or visit our
              Reports Shop.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-sm bg-brand-gold text-bg-dark font-semibold text-sm"
            >
              Go to Reports Shop
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
