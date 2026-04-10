"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterOwner } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
  businessName: z.string().min(2, "Business name required"),
  phone: z.string().optional(),
});

type Form = z.infer<typeof schema>;

export default function RegisterPage() {
  const registerOwner = useRegisterOwner();
  const [showPw, setShowPw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-subtle)] px-4 py-10">
      <Card className="w-full max-w-[440px] border-[var(--border-default)] shadow-[var(--shadow-lg)]">
        <CardHeader className="text-center">
          <CardTitle className="font-[family-name:var(--font-display)] text-2xl">
            Start free
          </CardTitle>
          <CardDescription>Create your HerBizReach storefront in minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={handleSubmit((data) =>
              registerOwner.mutate({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                businessName: data.businessName,
                phone: data.phone?.trim() || undefined,
              }),
            )}
          >
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                className={cn(errors.fullName && "border-[var(--danger)] ring-1 ring-[var(--danger)]")}
                {...register("fullName")}
              />
              {errors.fullName ? (
                <p className="text-xs text-[var(--danger)]">{errors.fullName.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className={cn(errors.email && "border-[var(--danger)] ring-1 ring-[var(--danger)]")}
                {...register("email")}
              />
              {errors.email ? (
                <p className="text-xs text-[var(--danger)]">{errors.email.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex gap-2">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  className={cn(errors.password && "border-[var(--danger)] ring-1 ring-[var(--danger)]")}
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="min-h-11 shrink-0 px-3"
                  onClick={() => setShowPw((s) => !s)}
                >
                  {showPw ? "Hide" : "Show"}
                </Button>
              </div>
              {errors.password ? (
                <p className="text-xs text-[var(--danger)]">{errors.password.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessName">Business name</Label>
              <Input
                id="businessName"
                className={cn(
                  errors.businessName && "border-[var(--danger)] ring-1 ring-[var(--danger)]",
                )}
                {...register("businessName")}
              />
              {errors.businessName ? (
                <p className="text-xs text-[var(--danger)]">{errors.businessName.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>
            <Button type="submit" className="min-h-11 w-full" disabled={registerOwner.isPending}>
              {registerOwner.isPending ? "Creating…" : "Create my store"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[var(--brand-primary)]">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
