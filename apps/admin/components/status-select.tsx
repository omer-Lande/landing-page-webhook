"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { REQUEST_STATUSES, type RequestStatus } from "@repo/core/airtable";
import { cn } from "@repo/ui/utils";

const STATUS_STYLES: Record<RequestStatus, string> = {
  חדש: "border-primary/50 text-primary",
  "קיבל הצעת מחיר": "border-[color:var(--secondary)]/50 text-[color:var(--secondary)]",
  "סגר חבילה": "border-card-foreground/30 text-card-foreground/70",
  "לא סגר חבילה": "border-destructive/50 text-destructive",
};

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

  async function onChange(next: RequestStatus) {
    const previous = current;
    setCurrent(next);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/requests/${requestId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });

      if (!response.ok) {
        throw new Error("update failed");
      }

      router.refresh();
    } catch {
      setCurrent(previous);
    } finally {
      setIsSaving(false);
    }
  }

  return (
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
  );
}
