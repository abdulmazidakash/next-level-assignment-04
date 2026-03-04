"use client";

import * as React from "react";
import {
  PieChart,
  Bot,
  SquareTerminal,
  GalleryVerticalEnd,
  Frame,
  Command,
  Settings2,
  BookOpen,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "CUSTOMER" | "PROVIDER";
}

const ADMIN_navMain = [
  { title: "Dashboard", url: "/admin", icon: PieChart },
  { title: "Users", url: "/admin/users", icon: Bot },
  { title: "Orders", url: "/admin/orders", icon: SquareTerminal },
  { title: "Categories", url: "/admin/categories", icon: GalleryVerticalEnd },
];

const CUSTOMER_navMain = [
  { title: "My Orders", url: "/orders", icon: SquareTerminal },
  { title: "Cart", url: "/cart", icon: Frame },
  { title: "Checkout", url: "/checkout", icon: Command },
  { title: "Profile", url: "/profile", icon: Settings2 },
];

const PROVIDER_navMain = [
  { title: "Dashboard", url: "/provider/dashboard", icon: PieChart },
  { title: "Manage Menu", url: "/provider/menu", icon: BookOpen },
  { title: "Orders", url: "/provider/orders", icon: SquareTerminal },
  { title: "Profile", url: "/profile", icon: Settings2 },
];

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  let navItems;

  switch (userRole) {
    case "ADMIN":
      navItems = ADMIN_navMain;
      break;
    case "CUSTOMER":
      navItems = CUSTOMER_navMain;
      break;
    case "PROVIDER":
      navItems = PROVIDER_navMain;
      break;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* HEADER */}
      <SidebarHeader className="px-4 py-3 font-bold text-lg">
        {/* Full text (hide when collapsed) */}
        <Link href={'/'}>
          <span className="group-data-[collapsible=icon]:hidden">
            FoodHub 🍱
          </span>
        </Link>

        {/* Only logo (show when collapsed) */}
        <Link href={'/'}>
          <span className="hidden group-data-[collapsible=icon]:block text-2xl">🍱</span>
        </Link>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      {/* FOOTER (hide when collapsed) */}
      <SidebarFooter className="px-4 py-2 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
        © 2026 FoodHub
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}