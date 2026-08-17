import type { AirtableRequestRecord, RequestStatus } from "@repo/core/airtable";

const STATUS_PRIORITY: Record<RequestStatus, number> = {
  חדש: 0,
  "קיבל הצעת מחיר": 1,
  "סגר חבילה": 2,
  "לא סגר חבילה": 2,
};

export function sortRequestsByPriority(
  requests: AirtableRequestRecord[]
): AirtableRequestRecord[] {
  return [...requests].sort((a, b) => {
    const priorityDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    if (priorityDiff !== 0) return priorityDiff;

    return new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime();
  });
}
