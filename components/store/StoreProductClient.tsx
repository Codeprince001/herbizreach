"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import type { Product } from "@/types/product.types";
import type { PublicStorePayload } from "@/types/store.types";
import { useLogStoreView } from "@/hooks/useStore";
import { formatCurrency } from "@/lib/utils";
import { WhatsAppShareButton } from "./WhatsAppShareButton";

export function StoreProductClient(props: {
  slug: string;
  product: Product;
  store: PublicStorePayload;
}) {
  const { slug, product, store } = props;
  const logView = useLogStoreView(slug);

  useEffect(() => {
    logView.mutate({ productId: product.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, product.id]);

  const desc = product.descriptionAi ?? product.descriptionRaw;
  const waPhone =
    store.storeSettings?.whatsAppPhone ?? store.business.phone ?? null;
  const waMsg = `Hi! I'm interested in ${product.name} from ${store.business.businessName}.`;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] px-4 py-8">
      <Link
        href={`/store/${slug}`}
        className="mb-6 inline-flex min-h-11 items-center text-sm font-medium text-[var(--brand-primary)]"
      >
        ← Back to store
      </Link>
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-muted)]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 text-xl font-semibold text-[var(--brand-primary)]">
            {formatCurrency(product.price)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap">
            {desc}
          </p>
          <div className="mt-8">
            <WhatsAppShareButton phone={waPhone} message={waMsg} className="w-full md:w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
