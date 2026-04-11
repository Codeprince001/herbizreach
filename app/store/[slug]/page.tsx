import { notFound } from "next/navigation";
import { StorePublicView } from "@/components/store/StorePublicView";
import { fetchPublicStore } from "@/lib/server-api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await fetchPublicStore(slug);
  if (!data) return { title: "Store" };
  return {
    title: `${data.business.businessName} | HerBizReach`,
    description:
      data.storeSettings?.description?.trim() ||
      data.storeSettings?.tagline ||
      `Shop ${data.business.businessName}`,
  };
}

export default async function PublicStorePage({ params }: Props) {
  const { slug } = await params;
  const data = await fetchPublicStore(slug);
  if (!data) notFound();
  return <StorePublicView initial={data} />;
}
