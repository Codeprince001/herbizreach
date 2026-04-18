"use client";

import { ChevronLeft, ChevronRight, Loader2, Plus, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAppendProductImages, useEnhanceProductImage, useUpdateProduct } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";

const MAX_IMAGES = 8;

export function ProductGalleryEditor(props: { productId: string; imageUrls: string[] }) {
  const { productId, imageUrls } = props;
  const [urls, setUrls] = useState<string[]>(imageUrls);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const updateProduct = useUpdateProduct(productId);
  const appendImages = useAppendProductImages(productId);
  const enhanceImage = useEnhanceProductImage(productId);

  useEffect(() => {
    setUrls([...imageUrls]);
  }, [productId, imageUrls.join("\n")]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [productId]);

  useEffect(() => {
    if (!urls.length) return;
    setSelectedIdx((s) => Math.min(s, urls.length - 1));
  }, [urls.length]);

  useEffect(() => {
    const el = stripRef.current?.querySelector(`[data-thumb-index="${selectedIdx}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedIdx]);

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

  function moveSelected(dir: -1 | 1) {
    const i = selectedIdx;
    if (dir === -1 && i === 0) return;
    if (dir === 1 && i === urls.length - 1) return;
    move(i, dir);
    setSelectedIdx(i + dir);
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
  const manyPhotos = urls.length >= 5;
  const selectedUrl = urls[selectedIdx];
  const canMoveLeft = selectedIdx > 0;
  const canMoveRight = selectedIdx < urls.length - 1;

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

        {/* Mobile: horizontal thumbs + one preview + one control row */}
        <div className="space-y-3 lg:hidden">
          {urls.length > 0 && selectedUrl ? (
            <>
              <button
                type="button"
                className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-muted)] ring-1 ring-[var(--border-default)]"
                onClick={() => setPreviewOpen(true)}
                aria-label="View photo full screen"
              >
                <Image
                  src={selectedUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  unoptimized={selectedUrl.startsWith("http://localhost")}
                  priority
                />
                {selectedIdx === 0 ? (
                  <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-black/65 px-2 py-0.5 text-[11px] font-medium text-white">
                    Cover
                  </span>
                ) : null}
              </button>
              <div className="flex flex-col gap-0.5 text-center">
                <p className="text-xs font-medium text-[var(--text-muted)]">
                  {selectedIdx + 1} of {urls.length}
                </p>
                <p className="text-[10px] text-[var(--text-muted)]">Tap image to enlarge</p>
              </div>

              <div
                ref={stripRef}
                className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {urls.map((url, i) => (
                  <button
                    key={url}
                    type="button"
                    data-thumb-index={i}
                    onClick={() => setSelectedIdx(i)}
                    className={cn(
                      "relative size-16 shrink-0 snap-center snap-always overflow-hidden rounded-[var(--radius-md)] ring-2 ring-offset-2 ring-offset-[var(--bg-card)] transition-all",
                      i === selectedIdx
                        ? "ring-[var(--brand-primary)]"
                        : "ring-transparent opacity-80 hover:opacity-100",
                    )}
                    aria-label={`Photo ${i + 1}${i === 0 ? ", cover" : ""}`}
                    aria-current={i === selectedIdx}
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                      unoptimized={url.startsWith("http://localhost")}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-1">
                <div className="flex flex-1 items-center gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className={cn("size-9 shrink-0 rounded-md", !canMoveLeft && "opacity-40")}
                    disabled={busy || !canMoveLeft}
                    aria-label="Move earlier in gallery"
                    onClick={() => moveSelected(-1)}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className={cn("size-9 shrink-0 rounded-md", !canMoveRight && "opacity-40")}
                    disabled={busy || !canMoveRight}
                    aria-label="Move later in gallery"
                    onClick={() => moveSelected(1)}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="size-9 shrink-0 rounded-md"
                  disabled={busy || urls.length <= 1}
                  aria-label="Remove selected photo"
                  onClick={() => {
                    removeAt(selectedIdx);
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="w-full min-h-9 gap-1.5 text-xs"
                disabled={busy}
                onClick={() => {
                  enhanceImage.mutate(selectedUrl, {
                    onSuccess: (data) => setUrls([...data.imageUrls]),
                  });
                }}
              >
                {enhanceImage.isPending && enhanceImage.variables === selectedUrl ? (
                  <Loader2 className="size-3.5 shrink-0 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5 shrink-0" />
                )}
                Enhance with AI
              </Button>
            </>
          ) : null}
        </div>

        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-h-[95vh] max-w-[min(100vw-1rem,36rem)] border-0 bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:ring-offset-transparent">
            <DialogTitle className="sr-only">Product photo preview</DialogTitle>
            {selectedUrl ? (
              <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] bg-black/40">
                <Image
                  src={selectedUrl}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width:768px) 100vw, 600px"
                  unoptimized={selectedUrl.startsWith("http://localhost")}
                />
              </div>
            ) : null}
          </DialogContent>
        </Dialog>

        {/* Desktop: original grid */}
        <ul
          className={cn(
            "hidden lg:grid",
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
