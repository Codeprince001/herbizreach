"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product.types";

export function ProductCard(props: {
  product: Product;
  viewCount?: number;
  index?: number;
  onDelete?: () => void;
  onDuplicate?: () => void;
}) {
  const { product, viewCount = 0, index = 0, onDelete, onDuplicate } = props;
  const imageSrc =
    product.imageUrls?.[0]?.trim() || product.imageUrl?.trim() || "";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--shadow-sm)]",
      )}
    >
      <div className="relative aspect-[4/3] w-full bg-[var(--bg-muted)] md:aspect-[3/2]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 45vw, 280px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-[var(--text-muted)]">
            No photo
          </div>
        )}
        <div className="absolute right-2 top-2">
          <Badge variant={product.isPublished ? "success" : "secondary"}>
            {product.isPublished ? "Live" : "Draft"}
          </Badge>
        </div>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="truncate font-[family-name:var(--font-display)] font-semibold text-[var(--text-primary)]">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-[var(--brand-primary)]">
          {formatCurrency(product.price)}
        </p>
        <p className="text-xs text-[var(--text-muted)]">{viewCount} views</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Button asChild variant="secondary" size="sm" className="min-h-10 min-w-[5.5rem] flex-1">
            <Link href={`/products/${product.id}`}>
              <Pencil className="mr-1 size-4" />
              Edit
            </Link>
          </Button>
          {onDuplicate ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="min-h-10 min-w-[5.5rem] flex-1"
              onClick={onDuplicate}
            >
              <Copy className="mr-1 size-4" />
              Duplicate
            </Button>
          ) : null}
          {onDelete ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="min-h-9 shrink-0 px-2.5 md:min-h-10 md:px-3"
              onClick={onDelete}
              aria-label="Delete product"
            >
              <Trash2 className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
