import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product.types";

export function StoreProductCard(props: { product: Product; slug: string }) {
  const { product, slug } = props;
  const desc = product.descriptionAi ?? product.descriptionRaw;
  const imageSrc = product.imageUrl?.trim() ?? "";
  return (
    <Link
      href={`/store/${slug}/products/${product.id}`}
      className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
    >
      <div className="relative aspect-square w-full bg-[var(--bg-muted)]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width:768px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-[var(--text-muted)]">
            No photo
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--text-primary)]">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-[var(--brand-primary)]">
          {formatCurrency(product.price)}
        </p>
        <p className="mt-2 line-clamp-2 text-xs text-[var(--text-muted)]">{desc}</p>
      </div>
    </Link>
  );
}
