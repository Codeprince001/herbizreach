"use client";

import { ChevronLeft, ChevronRight, Loader2, Plus, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppendProductImages, useEnhanceProductImage, useUpdateProduct } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";

const MAX_IMAGES = 8;

export function ProductGalleryEditor(props: { productId: string; imageUrls: string[] }) {
  const { productId, imageUrls } = props;
  const [urls, setUrls] = useState<string[]>(imageUrls);
  const fileRef = useRef<HTMLInputElement>(null);
  const updateProduct = useUpdateProduct(productId);
  const appendImages = useAppendProductImages(productId);
  const enhanceImage = useEnhanceProductImage(productId);

  useEffect(() => {
    setUrls([...imageUrls]);
  }, [productId, imageUrls.join("\n")]);

  function persistOrder(next: string[]) {
    const prev = urls;
    setUrls(next);
    updateProduct.mutate(
      { imageUrls: next },
      {
        onError: () => setUrls(prev),
      },
    );
  }

  function removeAt(i: number) {
    const next = urls.filter((_, j) => j !== i);
    if (next.length === 0) return;
    persistOrder(next);
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= urls.length) return;
    const next = [...urls];
    [next[i], next[j]] = [next[j], next[i]];
    persistOrder(next);
  }

  function onPickFiles(e: ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list?.length) return;
    const picked = Array.from(list).slice(0, MAX_IMAGES - urls.length);
    if (!picked.length) {
      e.target.value = "";
      return;
    }
    const fd = new FormData();
    picked.forEach((f) => fd.append("images", f));
    appendImages.mutate(fd, {
      onSuccess: (data) => setUrls([...data.imageUrls]),
    });
    e.target.value = "";
  }

  const busy = updateProduct.isPending || appendImages.isPending || enhanceImage.isPending;
  const room = MAX_IMAGES - urls.length;
  /** Fewer, larger cells for 1–4 photos; denser grid so 5–8 do not stretch the page. */
  const manyPhotos = urls.length >= 5;

  return (
    <Card className="border-[var(--border-default)]">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-base">Photos</CardTitle>
        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onPickFiles}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="min-h-9"
            disabled={busy || room <= 0}
            onClick={() => fileRef.current?.click()}
          >
            {appendImages.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Plus className="mr-1 size-4" />
                Add ({room} left)
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {busy && !appendImages.isPending && !enhanceImage.isPending ? (
          <p className="mb-2 flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Loader2 className="size-3.5 animate-spin" />
            Saving order…
          </p>
        ) : null}
        {enhanceImage.isPending ? (
          <p className="mb-2 flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Loader2 className="size-3.5 animate-spin" />
            Enhancing image with AI…
          </p>
        ) : null}
        <ul
          className={cn(
            "grid",
            manyPhotos
              ? "grid-cols-2 gap-3 md:grid-cols-3"
              : "grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2",
          )}
        >
          {urls.map((url, i) => (
            <li key={url} className={cn("flex min-w-0 flex-col", manyPhotos ? "gap-1.5" : "gap-2")}>
              <div className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-muted)] ring-1 ring-[var(--border-default)]">
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes={
                    manyPhotos
                      ? "(max-width:640px) 46vw, (max-width:768px) 30vw, (max-width:1280px) 22vw, 180px"
                      : "(max-width:640px) 92vw, (max-width:1024px) 42vw, (max-width:1280px) 38vw, 320px"
                  }
                  unoptimized={url.startsWith("http://localhost")}
                />
                {i === 0 ? (
                  <span className="absolute left-2 top-2 rounded-md bg-black/65 px-2 py-0.5 text-[11px] font-medium text-white">
                    Cover
                  </span>
                ) : null}
              </div>
              <div
                className={cn(
                  "flex items-center justify-between gap-1 pt-0.5",
                  manyPhotos && "flex-wrap sm:flex-nowrap",
                )}
              >
                <div className="flex min-w-0 flex-1 items-center gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className={cn(
                      "shrink-0 rounded-md",
                      manyPhotos ? "size-8" : "size-9",
                      i === 0 && "opacity-40",
                    )}
                    disabled={busy || i === 0}
                    aria-label="Move earlier"
                    onClick={() => move(i, -1)}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className={cn(
                      "shrink-0 rounded-md",
                      manyPhotos ? "size-8" : "size-9",
                      i === urls.length - 1 && "opacity-40",
                    )}
                    disabled={busy || i === urls.length - 1}
                    aria-label="Move later"
                    onClick={() => move(i, 1)}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className={cn("shrink-0 rounded-md", manyPhotos ? "size-8" : "size-9")}
                  disabled={busy || urls.length <= 1}
                  aria-label="Remove photo"
                  onClick={() => removeAt(i)}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="w-full min-h-8 gap-1.5 text-xs"
                disabled={busy}
                onClick={() => {
                  enhanceImage.mutate(url, {
                    onSuccess: (data) => setUrls([...data.imageUrls]),
                  });
                }}
              >
                {enhanceImage.isPending && enhanceImage.variables === url ? (
                  <Loader2 className="size-3.5 shrink-0 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5 shrink-0" />
                )}
                Enhance with AI
              </Button>
            </li>
          ))}
        </ul>
        {urls.length <= 1 ? (
          <p className="mt-3 text-xs text-[var(--text-muted)]">Add more angles so buyers trust what they&apos;re getting.</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
