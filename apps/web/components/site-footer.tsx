import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="ticket-barcode text-foreground/15" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-10">
        <span className="font-heading text-xl text-foreground">ספורטיקט</span>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/terms" className="underline-offset-4 hover:text-foreground hover:underline">
            תנאי שימוש
          </Link>
          <Link href="/privacy" className="underline-offset-4 hover:text-foreground hover:underline">
            מדיניות פרטיות
          </Link>
        </nav>
        <span className="text-sm text-muted-foreground">כל משחק. בכל מקום.</span>
      </div>
    </footer>
  );
}
