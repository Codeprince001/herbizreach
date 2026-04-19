import type { Metadata, Viewport } from "next";
import { StorePwaRegister } from "@/components/store/StorePwaRegister";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    manifest: `/store/${slug}/manifest`,
    appleWebApp: {
      capable: true,
      title: "HerBizReach store",
      statusBarStyle: "default",
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#7c3aed",
};

export default function PublicStoreLayout({ children }: Props) {
  return (
    <>
      <StorePwaRegister />
      {children}
    </>
  );
}
