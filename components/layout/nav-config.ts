import {
  BarChart3,
  Bell,
  Home,
  LayoutGrid,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";

export const ownerNav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: LayoutGrid },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export const ownerNavExtra = [
  { href: "/notifications", label: "Notification", icon: Bell },
  { href: "/leads", label: "Leads", icon: Users },
] as const;
