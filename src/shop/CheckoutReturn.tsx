import React, { useEffect, useState } from 'react';
import { Download, Loader2, MailCheck, Clock, X } from 'lucide-react';
import { clearCheckout, getOrderStatus, paidPdfUrl, recallCheckout, rememberCheckout, type CheckoutOutcome, type PaidTier, TIER_INFO } from './orders';

interface CheckoutReturnProps {
  outcome: CheckoutOutcome;
  intakeId: string;
  onClose: () => void;
}

const POLL_MS = 4000;
const WAIT_FOR_ORDER_MS = 60_000;
const SLOW_POLL_MS = 30_000;

type View =
  | { kind: 'waiting' }
  | { kind: 'generating'; tier: PaidTier }
  | { kind: 'ready'; tier: PaidTier; emailSent: boolean }
  | { kind: 'delayed' }
  | { kind: 'refunded' }
  | { kind: 'no-order' }
  | { kind: 'not-found' };

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-lg rounded-sm border border-border-main bg-bg-panel p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-border-main pb-3">
          <h2 className="font-display text-xl text-text-main font-normal m-0">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-xs text-text-dim hover:text-text-main hover:bg-bg-dark transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function CheckoutReturn({ outcome, intakeId, onClose }: CheckoutReturnProps) {
  const [mode, setMode] = useState<'cancelled' | 'poll'>(outcome === 'cancelled' ? 'cancelled' : 'poll');
  const [view, setView] = useState<View>({ kind: 'waiting' });

  useEffect(() => {
    if (outcome !== 'success') return;
    rememberCheckout(intakeId);
  }, [outcome, intakeId]);

  useEffect(() => {
    if (mode !== 'poll') return;
    let alive = true;
    const started = Date.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = async () => {
      try {
        const s = await getOrderStatus(intakeId);
        if (!alive) return;
        if (!s) { clearCheckout(); setView({ kind: 'not-found' }); return; }
        const paid = s.orders.find((o) => o.tier === 'consult' || o.tier === 'premium' || o.tier === 'standard');
        if (paid) {
          const tier = paid.tier as PaidTier;
          if (paid.status === 'ready') { clearCheckout(); setView({ kind: 'ready', tier, emailSent: paid.emailSent }); return; }
          if (paid.status === 'refunded') { clearCheckout(); setView({ kind: 'refunded' }); return; }
          if (paid.status === 'failed') { clearCheckout(); setView({ kind: 'delayed' }); return; }
          setView({ kind: 'generating', tier });
        } else if (Date.now() - started > WAIT_FOR_ORDER_MS) {
          setView({ kind: 'no-order' });
          timer = setTimeout(tick, SLOW_POLL_MS);
          return;
        }
      } catch {
        /* transient network blip — keep polling */
      }
      if (alive) timer = setTimeout(tick, POLL_MS);
    };

    tick();
    return () => { alive = false; if (timer) clearTimeout(timer); };
  }, [mode, intakeId]);

  const close = () => {
    if (recallCheckout() === intakeId && view.kind !== 'waiting' && view.kind !== 'generating') clearCheckout();
    onClose();
  };

  if (mode === 'cancelled') {
    return (
      <ModalShell title="Checkout cancelled" onClose={onClose}>
        <p className="text-sm text-text-dim leading-relaxed">
          No payment was taken. Your selected tier and birth details are still right here whenever you&apos;re ready.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 rounded-sm bg-brand-gold text-bg-dark font-semibold text-sm hover:brightness-105 cursor-pointer"
          >
            Return to Shop
          </button>
        </div>
      </ModalShell>
    );
  }

  const busy = view.kind === 'waiting' || view.kind === 'generating';
  return (
    <ModalShell title={view.kind === 'ready' ? 'Your reading is ready' : 'Thank you for your order'} onClose={close}>
      <div className="space-y-4 text-sm" aria-live="polite">
        {busy && (
          <div className="flex items-start gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="text-text-main font-medium">
                {view.kind === 'generating' ? `Writing your ${TIER_INFO[view.tier].name}…` : 'Confirming your payment…'}
              </p>
              <p className="text-text-dim">
                This usually takes a couple of minutes. You can keep this window open, or come back to this page later; we&apos;ll also email the PDF to you.
              </p>
            </div>
          </div>
        )}
        {view.kind === 'ready' && (
          <div className="space-y-3">
            <p className="flex items-start gap-2 text-text-main">
              <MailCheck className="w-5 h-5 text-wood-yang shrink-0" aria-hidden="true" />
              <span>
                {view.tier === 'consult'
                  ? 'Your Full Reading PDF is ready below, and we have emailed you a separate welcome guide explaining how to start your 7-Day Private Email Consultation (7 business days, Mon–Fri).'
                  : `Your ${TIER_INFO[view.tier].name} is ready. ${view.emailSent ? 'A copy has been emailed to you.' : "We'll also email you a copy."}`}
              </span>
            </p>
            <a
              href={paidPdfUrl(intakeId, view.tier)}
              className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-sm bg-brand-gold text-bg-dark font-semibold hover:brightness-105"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download your {view.tier === 'consult' ? 'included Full Reading (PDF)' : 'reading (PDF)'}
            </a>
          </div>
        )}
        {view.kind === 'delayed' && (
          <p className="flex items-start gap-2 text-text-main">
            <Clock className="w-5 h-5 text-brand-gold shrink-0" aria-hidden="true" />
            Your reading is taking longer than usual. We&apos;re on it, and it will arrive in your inbox as soon as it&apos;s done.
          </p>
        )}
        {view.kind === 'refunded' && <p className="text-text-main">This order was refunded, so the reading is no longer available.</p>}
        {view.kind === 'no-order' && (
          <p className="text-text-main">
            We haven&apos;t received the payment confirmation yet. If you were charged, your reading will be emailed to you shortly.
          </p>
        )}
        {view.kind === 'not-found' && (
          <p className="text-text-main">We couldn&apos;t find this order. If you were charged, check your email for your reading.</p>
        )}
      </div>
    </ModalShell>
  );
}
