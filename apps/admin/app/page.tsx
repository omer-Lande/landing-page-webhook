import { listRequests } from "@repo/core/airtable";
import { sortRequestsByPriority } from "@/lib/sort-requests";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { LogoutButton } from "@/components/logout-button";
import { StatusSelect } from "@/components/status-select";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const requests = sortRequestsByPriority(await listRequests());

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
          <span className="font-heading text-2xl text-foreground">ספורטיקט · ניהול</span>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:px-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-heading text-3xl text-foreground">פניות</h1>
          <span className="text-sm text-muted-foreground">{requests.length} פניות</span>
        </div>

        {requests.length === 0 ? (
          <div className="ticket p-8 text-center text-card-foreground/70">
            אין עדיין פניות.
          </div>
        ) : (
          <div className="ticket overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-card-foreground/10 text-card-foreground/60">
                    <th className="px-4 py-3 text-start font-medium">סטטוס</th>
                    <th className="px-4 py-3 text-start font-medium">התקבל</th>
                    <th className="px-4 py-3 text-start font-medium">שם</th>
                    <th className="px-4 py-3 text-start font-medium">יצירת קשר</th>
                    <th className="px-4 py-3 text-start font-medium">הודעה</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr
                      key={req.id}
                      className="border-b border-card-foreground/10 align-top last:border-0"
                    >
                      <td className="px-4 py-3">
                        <StatusSelect requestId={req.id} status={req.status} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-card-foreground/70">
                        {formatRelativeTime(req.createdTime)}
                      </td>
                      <td className="px-4 py-3 font-medium text-card-foreground">
                        {req.fullName}
                      </td>
                      <td className="px-4 py-3 text-card-foreground/80" dir="ltr">
                        <div>{req.email}</div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span>{req.phone || "—"}</span>
                          {req.preferCall && (
                            <span
                              dir="rtl"
                              className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground"
                            >
                              מעדיף שיחה
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="max-w-xs px-4 py-3 text-card-foreground/80">
                        {req.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
