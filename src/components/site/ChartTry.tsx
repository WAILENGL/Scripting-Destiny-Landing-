import { useState, useRef, type FormEvent } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { calculateBaZi } from "@/lib/baziCalculator";
import type { BaZiChart, ElementType } from "@/types/bazi";
import { WaitlistForm } from "./WaitlistForm";

export const ELEMENT_BAR: Record<ElementType, string> = {
  Wood: "bg-wood",
  Fire: "bg-fire",
  Earth: "bg-earth",
  Metal: "bg-metal",
  Water: "bg-water",
};

export const ELEMENT_TEXT: Record<ElementType, string> = {
  Wood: "text-wood",
  Fire: "text-fire",
  Earth: "text-earth",
  Metal: "text-metal",
  Water: "text-water",
};

export const ELEMENT_METALLIC: Record<ElementType, string> = {
  Wood: "metallic-wood",
  Fire: "metallic-fire",
  Earth: "metallic-earth",
  Metal: "metallic-metal",
  Water: "metallic-water",
};

export function ChartTry() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [chart, setChart] = useState<BaZiChart | null>(null);
  const datePickerRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!date.trim()) return;
    setChart(calculateBaZi(date, time));
    setTimeout(
      () =>
        document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
      50,
    );
  };

  return (
    <div className="rounded-2xl 2xl:rounded-3xl border border-border bg-card p-6 shadow-[0_20px_50px_-20px_oklch(0.2_0.01_60/0.12)] dark:shadow-[0_30px_60px_-30px_oklch(0_0_0/0.6)] sm:p-8 2xl:p-10 transition-all">
      <p className="eyebrow">Free · takes 10 seconds</p>
      <h2 className="mt-2 font-serif text-2xl 2xl:text-3xl">Find your Day Master</h2>
      <form
        onSubmit={submit}
        className="mt-6 grid gap-4 sm:grid-cols-[1fr_1fr_auto] 2xl:gap-5 sm:items-end"
      >
        <label className="grid gap-1.5 text-xs 2xl:text-sm font-medium text-muted-foreground">
          Birth date
          <div className="relative flex items-center">
            <input
              type="text"
              required
              placeholder="DD-MM-YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 2xl:h-12 w-full rounded-lg 2xl:rounded-xl border border-input bg-background px-3 2xl:px-4 pr-10 text-sm 2xl:text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
            />
            <button
              type="button"
              aria-label="Open calendar"
              onClick={() => {
                if (datePickerRef.current) {
                  try {
                    datePickerRef.current.showPicker();
                  } catch {
                    datePickerRef.current.focus();
                  }
                }
              }}
              className="absolute right-2.5 p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Calendar className="h-4 w-4" />
            </button>
            <input
              ref={datePickerRef}
              type="date"
              tabIndex={-1}
              aria-hidden="true"
              className="sr-only"
              onChange={(e) => {
                if (e.target.value) {
                  const [y, m, d] = e.target.value.split("-");
                  if (y && m && d) {
                    setDate(`${d}-${m}-${y}`);
                  }
                }
              }}
            />
          </div>
        </label>
        <label className="grid gap-1.5 text-xs 2xl:text-sm font-medium text-muted-foreground">
          Birth time <span className="sr-only">(optional)</span>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="h-11 2xl:h-12 rounded-lg 2xl:rounded-xl border border-input bg-background px-3 2xl:px-4 text-sm 2xl:text-base text-foreground outline-none focus:border-accent"
          />
        </label>
        <button
          type="submit"
          className="gold-surface inline-flex h-11 2xl:h-12 items-center justify-center gap-2 rounded-lg 2xl:rounded-xl bg-accent px-5 2xl:px-7 text-sm 2xl:text-base font-semibold text-accent-foreground transition hover:bg-primary hover:text-primary-foreground"
        >
          Reveal <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {chart && (
        <div
          id="result"
          className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500 rule-top pt-8"
        >
          <div className="flex items-start gap-5 2xl:gap-6">
            <span
              className={`font-serif text-6xl 2xl:text-7xl leading-none ${ELEMENT_METALLIC[chart.dayMaster.element]}`}
            >
              {chart.dayMaster.hanzi}
            </span>
            <div>
              <p className="eyebrow">
                {chart.dayMaster.pinyin} {chart.dayMaster.element} · You are
              </p>
              <h3 className="font-serif text-2xl 2xl:text-3xl">{chart.dayMaster.title}</h3>
              <p className="text-sm 2xl:text-base italic text-muted-foreground">
                {chart.dayMaster.archetype}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm 2xl:text-base leading-relaxed">
            {chart.dayMaster.description}
          </p>

          {/* Balanced side-by-side grid on tablet/desktop to reduce vertical stack */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 2xl:gap-8 items-start">
            <div>
              <p className="eyebrow mb-2">Your eight characters</p>
              <div className="grid grid-cols-4 gap-1.5 rounded-lg 2xl:rounded-xl border border-border/80 dark:border-metal/40 p-1.5 bg-background/30">
                {(["hour", "day", "month", "year"] as const).map((k) => (
                  <div
                    key={k + "s"}
                    className={`pillar-cell ${ELEMENT_TEXT[chart[k].stem.element]} ${k === "day" ? "ring-1 ring-accent/60" : ""}`}
                  >
                    {chart[k].stem.hanzi}
                  </div>
                ))}
                {(["hour", "day", "month", "year"] as const).map((k) => (
                  <div
                    key={k + "b"}
                    className={`pillar-cell ${ELEMENT_TEXT[chart[k].branch.element]}`}
                  >
                    {chart[k].branch.hanzi}
                  </div>
                ))}
              </div>
              <div className="mt-1.5 grid grid-cols-4 text-center text-[10px] 2xl:text-xs uppercase tracking-widest text-muted-foreground">
                <span>Hour</span>
                <span>Day</span>
                <span>Month</span>
                <span>Year</span>
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2">Five elements balance</p>
              <div className="grid gap-2.5 rounded-lg 2xl:rounded-xl border border-border/60 bg-background/30 p-3 2xl:p-4">
                {(Object.keys(chart.elementBalance) as ElementType[]).map((el) => (
                  <div key={el} className="flex items-center gap-3 text-xs 2xl:text-sm">
                    <span className="w-12 text-muted-foreground font-medium">{el}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full ${ELEMENT_BAR[el]} transition-all duration-500`}
                        style={{ width: `${chart.elementBalance[el]}%` }}
                      />
                    </div>
                    <span className="w-8 text-right tabular-nums font-mono">
                      {chart.elementBalance[el]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl 2xl:rounded-2xl bg-secondary p-5 2xl:p-6">
            <p className="text-sm 2xl:text-base font-semibold">Want the full reading?</p>
            <p className="mb-4 mt-1 text-sm 2xl:text-base text-muted-foreground">
              Your 10-year cycles, best timing windows and team compatibility are coming in the full
              app.
            </p>
            <WaitlistForm compact />
          </div>
        </div>
      )}
    </div>
  );
}
