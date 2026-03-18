"use client";

import * as React from "react";
import {
  PieChart, Users, ShoppingBag, Tag, ShoppingCart,
  User, UtensilsCrossed, PlusCircle, Home, Settings,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const NAV_CONFIG = {
  ADMIN: [
    {
      label: "Overview",
      items: [
        { title: "Dashboard",  href: "/dashboard",            icon: PieChart },
        { title: "Users",      href: "/dashboard/users",      icon: Users },
        { title: "Orders",     href: "/dashboard/orders",     icon: ShoppingBag },
        { title: "Categories", href: "/dashboard/categories", icon: Tag },
      ],
    },
  ],
  CUSTOMER: [
    {
      label: "My Account",
      items: [
        { title: "My Orders", href: "/dashboard/my-orders", icon: ShoppingBag },
        { title: "Cart",      href: "/dashboard/cart",      icon: ShoppingCart },
        { title: "Profile",   href: "/dashboard/profile",   icon: User },
      ],
    },
  ],
  PROVIDER: [
    {
      label: "Restaurant",
      items: [
        { title: "Dashboard",       href: "/dashboard",                    icon: LayoutDashboard },
        { title: "My Meals",        href: "/dashboard/provider-own-meals", icon: UtensilsCrossed },
        { title: "Add Meal",        href: "/dashboard/add-meal",           icon: PlusCircle },
        { title: "Incoming Orders", href: "/dashboard/orders",             icon: ShoppingBag },
      ],
    },
    {
      label: "Account",
      items: [
        { title: "Profile",          href: "/dashboard/profile",          icon: User },
        { title: "Provider Profile", href: "/dashboard/provider-profile", icon: Home },
      ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "CUSTOMER" | "PROVIDER";
  user?: { name?: string; email?: string };
}

function initials(name?: string) {
  return (
    name
      ?.split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() ?? "?"
  );
}

export function AppSidebar({ userRole, user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const sections = NAV_CONFIG[userRole] ?? NAV_CONFIG.CUSTOMER;
  const roleLabel = userRole.charAt(0) + userRole.slice(1).toLowerCase();

  return (
    <Sidebar
      collapsible="icon"
      className="!bg-[#1a1108] border-r border-white/6"
      {...props}
    >
      {/* ── Header ── */}
      <SidebarHeader className="!bg-[#1a1108] px-3 py-4 border-b border-white/6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8.5 h-8.5 rounded-[9px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-md shadow-rose-900/40 shrink-0">
            <UtensilsCrossed className="h-4 w-4 text-white" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden text-[1.1rem] font-bold text-white leading-none whitespace-nowrap">
            Food
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Hub
            </span>
          </span>
        </Link>

        <div className="group-data-[collapsible=icon]:hidden mt-2.5 inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-white/60 text-[10.5px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
          {roleLabel}
        </div>
      </SidebarHeader>

      {/* ── Content ── */}
      <SidebarContent className="!bg-[#1a1108] px-2 py-3 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="group-data-[collapsible=icon]:hidden text-[9.5px] font-bold tracking-widest uppercase text-white/25 px-3 pt-3 pb-1.5 first:pt-1">
              {section.label}
            </p>

            <div className="flex flex-col gap-0.5">
              {section.items.map(({ title, href, icon: Icon }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/dashboard" && pathname.startsWith(href));

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "relative flex items-center gap-2.5 px-3 py-2.5 rounded-[10px]",
                      "text-[13.5px] font-medium transition-all",
                      "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
                      "group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:mx-auto",
                      isActive
                        ? "bg-orange-500/15 text-white font-semibold"
                        : "text-white/50 hover:bg-white/6 hover:text-white/90"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-[55%] rounded-r-full bg-linear-to-b from-orange-500 to-rose-600 group-data-[collapsible=icon]:hidden" />
                    )}

                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive ? "text-orange-400" : "text-white/40"
                      )}
                      strokeWidth={isActive ? 2.5 : 2}
                    />

                    <span className="group-data-[collapsible=icon]:hidden truncate">
                      {title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="!bg-[#1a1108] px-2 py-3 border-t border-white/6">
        <div className="group-data-[collapsible=icon]:hidden flex items-center gap-2.5 px-3 py-2 rounded-[10px] hover:bg-white/6 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
            {initials(user?.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white/85 truncate">
              {user?.name ?? "User"}
            </p>
            <p className="text-[11px] text-white/35 truncate">
              {user?.email ?? ""}
            </p>
          </div>
          <Settings className="h-3.5 w-3.5 text-white/30 shrink-0" />
        </div>

        <div className="hidden group-data-[collapsible=icon]:flex justify-center">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
            {initials(user?.name)}
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}