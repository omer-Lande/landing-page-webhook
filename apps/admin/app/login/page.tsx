"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, Loader2 } from "lucide-react";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "משהו השתבש. נסו שוב.");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "משהו השתבש. נסו שוב.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="ticket w-full max-w-sm p-8">
        <p className="font-data text-xs text-card-foreground/60">כניסת מנהל</p>
        <h1 className="mt-2 font-heading text-3xl text-card-foreground">התחברות</h1>
        <p className="mt-1 text-sm text-card-foreground/70">
          התחברו כדי לצפות בפניות ולעדכן סטטוס.
        </p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">שם משתמש</Label>
            <Input
              id="username"
              dir="ltr"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">סיסמה</Label>
            <Input
              id="password"
              type="password"
              dir="ltr"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-2 h-10">
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" aria-hidden />
                מתחברים...
              </>
            ) : (
              "התחברות"
            )}
          </Button>

          <div aria-live="polite" className="min-h-5">
            {error && (
              <p className="flex items-center gap-1.5 text-sm text-destructive">
                <CircleAlert aria-hidden className="size-4" />
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
