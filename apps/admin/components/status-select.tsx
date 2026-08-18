"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";

import { REQUEST_STATUSES, type RequestStatus } from "@repo/core/airtable";
import { cn } from "@repo/ui/utils";

const STATUS_STYLES: Record<RequestStatus, string> = {
  חדש: "border-primary/50 text-primary",
  "קיבל הצעת מחיר": "border-[color:var(--secondary)]/50 text-[color:var(--secondary)]",
  "סגר חבילה": "border-card-foreground/30 text-card-foreground/70",
  "לא סגר חבילה": "border-destructive/50 text-destructive",
};

type Feedback = "success" | "error" | null;

export function StatusSelect({
  requestId,
  status,
}: {
  requestId: string;
  status: RequestStatus;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    };
  }, []);

  function showFeedback(result: Feedback) {
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    setFeedback(result);
    feedbackTimeout.current = setTimeout(() => setFeedback(null), 2500);
  }

  async function onChange(next: RequestStatus) {
    const previous = current;
    setCurrent(next);
    setIsSaving(true);
    setFeedback(null);

    try {
      const response = await fetch(`/api/requests/${requestId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });

      if (!response.ok) {
        throw new Error("update failed");
      }

      showFeedback("success");
      router.refresh();
    } catch {
      setCurrent(previous);
      showFeedback("error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-flex items-center">
        <select
          value={current}
          disabled={isSaving}
          onChange={(event) => onChange(event.target.value as RequestStatus)}
          className={cn(
            "h-8 rounded-lg border bg-card px-2.5 pe-6 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60",
            STATUS_STYLES[current]
          )}
        >
          {REQUEST_STATUSES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {isSaving && (
          <Loader2
            className="pointer-events-none absolute end-1.5 size-3.5 animate-spin text-card-foreground/50"
            aria-hidden
          />
        )}
      </div>

      {feedback === "success" && (
        <CircleCheck className="size-4 shrink-0 text-primary" aria-hidden />
      )}
      {feedback === "error" && (
        <CircleAlert className="size-4 shrink-0 text-destructive" aria-hidden />
      )}
      <span role="status" aria-live="polite" className="sr-only">
        {feedback === "success" && "הסטטוס עודכן בהצלחה."}
        {feedback === "error" && "עדכון הסטטוס נכשל, נסו שוב."}
      </span>
    </div>
  );
}
