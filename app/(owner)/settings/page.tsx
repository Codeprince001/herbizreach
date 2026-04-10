"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionError } from "@/components/shared/SectionError";
import { useStoreSettings, useUpdateStoreSettings } from "@/hooks/useStoreSettings";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";

const schema = z.object({
  whatsAppPhone: z.string().optional(),
  tagline: z.string().optional(),
  accentColor: z.string().optional(),
  showChatWidget: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const { data, isLoading, isError, refetch } = useStoreSettings();
  const update = useUpdateStoreSettings();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      whatsAppPhone: "",
      tagline: "",
      accentColor: "#7c3aed",
      showChatWidget: true,
    },
  });

  const showChat = watch("showChatWidget");

  useEffect(() => {
    if (!data) return;
    reset({
      whatsAppPhone: data.whatsAppPhone ?? "",
      tagline: data.tagline ?? "",
      accentColor: data.accentColor ?? "#7c3aed",
      showChatWidget: data.showChatWidget,
    });
  }, [data, reset]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError || !data) {
    return <SectionError message="Could not load settings." onRetry={() => void refetch()} />;
  }

  const slug = user?.businessSlug ?? "your-store";
  const previewUrl = `${appUrl.replace(/\/$/, "")}/store/${slug}`;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <PageHeader title="Store settings" description="Customize how your public page looks." />
      <Card className="border-[var(--border-default)]">
        <CardHeader>
          <CardTitle className="text-base">Your link</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="break-all rounded-[var(--radius-md)] bg-[var(--bg-muted)] p-3 text-sm text-[var(--brand-primary)]">
            {previewUrl}
          </p>
        </CardContent>
      </Card>

      <form
        className="space-y-6"
        onSubmit={handleSubmit((values) =>
          update.mutate({
            whatsAppPhone: values.whatsAppPhone?.trim() || undefined,
            tagline: values.tagline?.trim() || undefined,
            accentColor: values.accentColor?.trim() || undefined,
            showChatWidget: values.showChatWidget,
          }),
        )}
      >
        <Card className="border-[var(--border-default)]">
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="whatsAppPhone">WhatsApp phone</Label>
              <Input id="whatsAppPhone" placeholder="+234…" {...register("whatsAppPhone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Textarea id="tagline" {...register("tagline")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accentColorHex">Accent color</Label>
              <div className="flex gap-3">
                <input
                  type="color"
                  className="h-11 w-16 cursor-pointer rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-card)] p-1"
                  value={watch("accentColor")?.startsWith("#") ? watch("accentColor") : "#7c3aed"}
                  onChange={(e) => setValue("accentColor", e.target.value)}
                  aria-label="Pick accent color"
                />
                <Input
                  id="accentColorHex"
                  className={cn(errors.accentColor && "border-[var(--danger)]")}
                  {...register("accentColor")}
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border-default)] px-3 py-3">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Show chat widget</p>
                <p className="text-xs text-[var(--text-muted)]">Let visitors message you from your store</p>
              </div>
              <Switch
                checked={showChat}
                onCheckedChange={(v) => setValue("showChatWidget", v)}
              />
            </div>
          </CardContent>
        </Card>
        <Button type="submit" className="min-h-11 w-full" disabled={update.isPending}>
          {update.isPending ? <Loader2 className="size-4 animate-spin" /> : "Save settings"}
        </Button>
      </form>
    </div>
  );
}
