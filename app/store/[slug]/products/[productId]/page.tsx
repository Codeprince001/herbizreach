import { notFound } from "next/navigation";
import { StoreProductClient } from "@/components/store/StoreProductClient";
import { fetchPublicProduct, fetchPublicStore } from "@/lib/server-api";

type Props = { params: Promise<{ slug: string; productId: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug, productId } = await params;
  const product = await fetchPublicProduct(slug, productId);
  if (!product) return { title: "Product" };
  const text =
    product.descriptionAi?.trim() ||
    product.descriptionRaw?.trim() ||
    "";
  const desc = text.slice(0, 160);
  return { title: `${product.name} | HerBizReach`, description: desc };
}

export default async function StoreProductPage({ params }: Props) {
  const { slug, productId } = await params;
  const store = await fetchPublicStore(slug);
  const product = await fetchPublicProduct(slug, productId);
  if (!store || !product) notFound();
  return <StoreProductClient slug={slug} product={product} store={store} />;
}
