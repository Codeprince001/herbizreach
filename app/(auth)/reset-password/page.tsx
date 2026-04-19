"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthBackLink } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    email: z.string().email("Enter a valid email"),
    code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code from your email"),
    newPassword: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const presetEmail = searchParams.get("email")?.trim() ?? "";
  const resetPw = useResetPassword();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: presetEmail },
  });

  useEffect(() => {
    if (presetEmail) {
      setValue("email", presetEmail);
    }
  }, [presetEmail, setValue]);

  return (
    <div className="w-full max-w-[440px]">
      <AuthBackLink href="/login" label="Back to sign in" />
      <Card className="w-full border-[var(--border-default)] shadow-[var(--shadow-lg)]">
        <CardHeader className="text-center">
          <CardTitle className="font-[family-name:var(--font-display)] text-2xl">Set a new password</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your email, then choose a new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={handleSubmit((d) =>
              resetPw.mutate({
                email: d.email.trim(),
                code: d.code.trim(),
                newPassword: d.newPassword,
              }),
            )}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                className={cn(errors.email && "border-[var(--danger)] ring-1 ring-[var(--danger)]")}
                {...register("email")}
              />
              {errors.email ? (
                <p className="text-xs text-[var(--danger)]">{errors.email.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Verification code</Label>
              <Input
                id="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="123456"
                maxLength={6}
                className={cn(errors.code && "border-[var(--danger)] ring-1 ring-[var(--danger)]")}
                {...register("code")}
              />
              {errors.code ? (
                <p className="text-xs text-[var(--danger)]">{errors.code.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                className={cn(errors.newPassword && "border-[var(--danger)] ring-1 ring-[var(--danger)]")}
                {...register("newPassword")}
              />
              {errors.newPassword ? (
                <p className="text-xs text-[var(--danger)]">{errors.newPassword.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className={cn(
                  errors.confirmPassword && "border-[var(--danger)] ring-1 ring-[var(--danger)]",
                )}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <p className="text-xs text-[var(--danger)]">{errors.confirmPassword.message}</p>
              ) : null}
            </div>
            <Button type="submit" className="min-h-11 w-full" disabled={resetPw.isPending}>
              {resetPw.isPending ? "Updating…" : "Update password"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
            Need a new code?{" "}
            <Link href="/forgot-password" className="font-semibold text-[var(--brand-primary)]">
              Request again
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-[440px] text-center text-sm text-[var(--text-muted)]">Loading…</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
