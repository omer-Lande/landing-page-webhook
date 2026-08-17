"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { landingFormSchema, type LandingFormValues } from "@/lib/validation";

type SubmitState = "idle" | "success" | "error";

export function LandingForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LandingFormValues>({
    resolver: zodResolver(landingFormSchema),
    defaultValues: { preferCall: false },
  });

  async function onSubmit(values: LandingFormValues) {
    setSubmitState("idle");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "משהו השתבש. נסו שוב.");
      }

      setSubmitState("success");
      reset();
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "משהו השתבש. נסו שוב.");
    }
  }

  return (
    <div className="ticket p-8">
      <p className="font-data text-xs text-card-foreground/60">כרטיס יציאה · דברו איתנו</p>
      <h2 className="mt-2 font-heading text-3xl text-card-foreground">קבלו הצעת מחיר</h2>
      <p className="mt-1 text-sm text-card-foreground/70">
        ספרו לנו איזה משחק מעניין אתכם ונחזור אליכם עם הצעה מותאמת אישית.
      </p>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">
            שם מלא <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-sm text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">
            אימייל <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">
            טלפון <span className="text-card-foreground/50">(לא חובה)</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder="050-1234567"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="text-sm text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message">
            איזה משחק מעניין אתכם? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            rows={4}
            placeholder="לדוגמה: גמר ליגת האלופות 2026, זוג כרטיסים + 3 לילות מלון"
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <Controller
          name="preferCall"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2.5 text-sm text-card-foreground">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
              />
              אני מעדיף/ה שיחת טלפון להצעת מחיר
            </label>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="mt-2 h-10">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              שולחים...
            </>
          ) : (
            "קבלו הצעה"
          )}
        </Button>

        <div aria-live="polite" className="min-h-5">
          {submitState === "success" && (
            <p className="flex items-center gap-1.5 text-sm text-[color:var(--secondary)]">
              <CircleCheck aria-hidden className="size-4" />
              תודה! קיבלנו את הפנייה שלכם ונחזור אליכם בהקדם עם הצעה מותאמת אישית.
            </p>
          )}
          {submitState === "error" && (
            <p className="flex items-center gap-1.5 text-sm text-destructive">
              <CircleAlert aria-hidden className="size-4" />
              {errorMessage}
            </p>
          )}
        </div>
      </form>

      <div className="ticket-tear mt-8" />
      <div className="ticket-barcode mt-6 text-card-foreground/50" />
    </div>
  );
}
