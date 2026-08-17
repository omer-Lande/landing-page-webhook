import Link from "next/link";

import { buttonVariants } from "@repo/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="font-heading text-2xl text-foreground">
          ספורטיקט
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="/#leagues" className="rounded-sm underline-offset-4 transition-colors hover:text-foreground hover:underline">
            הליגות שלנו
          </Link>
          <Link href="/#how-it-works" className="rounded-sm underline-offset-4 transition-colors hover:text-foreground hover:underline">
            איך זה עובד
          </Link>
          <Link href="/#testimonial" className="rounded-sm underline-offset-4 transition-colors hover:text-foreground hover:underline">
            לקוחות מספרים
          </Link>
        </nav>
        <Link href="/#contact" className={buttonVariants({ size: "sm" })}>
          דברו איתנו
        </Link>
      </div>
      <div className="ticket-barcode text-foreground/15" />
    </header>
  );
}
