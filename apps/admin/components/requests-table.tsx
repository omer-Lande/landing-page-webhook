"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Square, SquareCheck } from "lucide-react";

import { REQUEST_STATUSES, type AirtableRequestRecord, type RequestStatus } from "@repo/core/airtable";
import { formatDate } from "@/lib/format-date";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { StatusSelect } from "@/components/status-select";

type DateSort = "default" | "asc" | "desc";

export function RequestsTable({ requests }: { requests: AirtableRequestRecord[] }) {
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [dateSort, setDateSort] = useState<DateSort>("default");

  const visibleRequests = useMemo(() => {
    const filtered =
      statusFilter === "all" ? requests : requests.filter((req) => req.status === statusFilter);

    if (dateSort === "default") return filtered;

    return [...filtered].sort((a, b) => {
      const diff = new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime();
      return dateSort === "asc" ? diff : -diff;
    });
  }, [requests, statusFilter, dateSort]);

  function cycleDateSort() {
    setDateSort((current) =>
      current === "default" ? "asc" : current === "asc" ? "desc" : "default"
    );
  }

  const DateSortIcon = dateSort === "asc" ? ArrowUp : dateSort === "desc" ? ArrowDown : ArrowUpDown;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          סטטוס:
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as RequestStatus | "all")}
            className="h-8 rounded-lg border border-border bg-card px-2.5 text-sm font-medium text-card-foreground outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="all">הכל</option>
            {REQUEST_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <span className="text-sm text-muted-foreground">
          {visibleRequests.length} מתוך {requests.length} פניות
        </span>
      </div>

      {visibleRequests.length === 0 ? (
        <div className="ticket p-8 text-center text-card-foreground/70">
          אין פניות התואמות לסינון.
        </div>
      ) : (
        <div className="ticket overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card-foreground/10 text-card-foreground/60">
                  <th className="px-4 py-3 text-start font-medium">סטטוס</th>
                  <th className="px-4 py-3 text-start font-medium">
                    <button
                      type="button"
                      onClick={cycleDateSort}
                      className="flex items-center gap-1 font-medium text-card-foreground/60 hover:text-card-foreground"
                    >
                      תאריך יצירה
                      <DateSortIcon className="size-3.5" aria-hidden />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-start font-medium">שם</th>
                  <th className="px-4 py-3 text-start font-medium">אימייל</th>
                  <th className="px-4 py-3 text-start font-medium">טלפון</th>
                  <th className="px-4 py-3 text-start font-medium">מעדיף שיחה</th>
                  <th className="px-4 py-3 text-start font-medium">הודעה</th>
                </tr>
              </thead>
              <tbody>
                {visibleRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-card-foreground/10 align-top last:border-0"
                  >
                    <td className="px-4 py-3">
                      <StatusSelect requestId={req.id} status={req.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-card-foreground/70">
                      <div dir="ltr" className="text-end">
                        {formatDate(req.createdTime)}
                      </div>
                      <div className="text-xs text-card-foreground/50">
                        {formatRelativeTime(req.createdTime)}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-card-foreground">
                      {req.fullName || "—"}
                    </td>
                    <td className="px-4 py-3 text-card-foreground/80" dir="ltr">
                      {req.email || "—"}
                    </td>
                    <td className="px-4 py-3 text-card-foreground/80" dir="ltr">
                      {req.phone || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {req.preferCall ? (
                        <SquareCheck className="size-5 text-primary" aria-label="כן" />
                      ) : (
                        <Square className="size-5 text-card-foreground/30" aria-label="לא" />
                      )}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-card-foreground/80">
                      {req.message || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
