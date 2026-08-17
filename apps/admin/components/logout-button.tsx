"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

import { Button } from "@repo/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function onClick() {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    router.push("/login");
    router.refresh();
  }

  return (
    <Button variant="ghost" size="sm" onClick={onClick} disabled={isLoggingOut}>
      {isLoggingOut ? <Loader2 className="animate-spin" aria-hidden /> : <LogOut aria-hidden />}
      התנתקות
    </Button>
  );
}
