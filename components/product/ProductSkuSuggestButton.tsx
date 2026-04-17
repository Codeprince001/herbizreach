"use client";

import { Hash, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSuggestSku } from "@/hooks/useAi";
import { generateProductSkuFromName } from "@/lib/generate-product-sku";

type ProductSkuSuggestButtonProps = {
  productName: string;
  descriptionRaw: string;
  onApplied: (sku: string) => void;
};

export function ProductSkuSuggestButton({
  productName,
  descriptionRaw,
  onApplied,
}: ProductSkuSuggestButtonProps) {
  const suggest = useSuggestSku();

  async function handleClick() {
    const n = productName.trim();
    if (n.length < 2) {
      toast.error("Add a product name (at least 2 characters) first.");
      return;
    }
    try {
      const { sku } = await suggest.mutateAsync({
        productName: n,
        descriptionRaw: descriptionRaw.trim() || undefined,
      });
      onApplied(sku);
      toast.success("SKU suggested");
    } catch {
      onApplied(generateProductSkuFromName(n));
      toast.success("SKU generated offline");
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className="h-8 shrink-0 gap-1.5 px-2.5 text-xs"
      disabled={suggest.isPending}
      onClick={() => void handleClick()}
    >
      {suggest.isPending ? (
        <Loader2 className="size-3.5 animate-spin" aria-hidden />
      ) : (
        <Hash className="size-3.5" aria-hidden />
      )}
      Suggest SKU
    </Button>
  );
}
