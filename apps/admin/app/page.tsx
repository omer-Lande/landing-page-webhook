import { listRequests } from "@repo/core/airtable";
import { sortRequestsByPriority } from "@/lib/sort-requests";
import { LogoutButton } from "@/components/logout-button";
import { RequestsTable } from "@/components/requests-table";

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
        <h1 className="mb-6 font-heading text-3xl text-foreground">פניות</h1>
        <RequestsTable requests={requests} />
      </main>
    </div>
  );
}
