import Link from "next/link";
import { TicketX } from "lucide-react";

import { buttonVariants } from "@repo/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="ticket w-full max-w-sm p-8 text-center">
        <TicketX className="mx-auto size-10 text-primary" aria-hidden />
        <p className="mt-4 font-data text-xs text-card-foreground/60">404 · כרטיס לא תקף</p>
        <h1 className="mt-2 font-heading text-3xl text-card-foreground">הדף לא נמצא</h1>
        <p className="mt-2 text-sm text-card-foreground/70">
          נראה שהעמוד שחיפשתם כבר לא קיים, או שהכתובת שגויה.
        </p>
        <Link href="/" className={buttonVariants({ size: "lg", className: "mt-6 h-11 px-6" })}>
          חזרה לדשבורד
        </Link>
        <div className="ticket-tear mt-8" />
        <div className="ticket-barcode mt-6 text-card-foreground/50" />
      </div>
    </div>
  );
}
