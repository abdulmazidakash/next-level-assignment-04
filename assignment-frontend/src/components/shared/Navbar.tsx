"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, LogOut, LogIn, UtensilsCrossed } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getUser, UserLogOut } from "@/services/auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ModeToggle } from "../ModeToggle";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Meals", href: "/meals" },
  { name: "Providers", href: "/providers" },
  { name: "About", href: "/about-us" },
];

function initials(name: string) {
  return name?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "?"
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getUser().then(setUser);
  }, [pathname]);

  const dashRoute = "/dashboard";

  const handleLogout = async () => {
    await UserLogOut();
    toast.success(
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold">Goodbye, {user?.name?.split(" ")[0]}! 👋</span>
        <span className="text-sm text-muted-foreground">You've been logged out.</span>
      </div>
    );
    setUser(null);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/92 dark:bg-zinc-950/90 backdrop-blur-md border-b border-black/8 dark:border-white/10 shadow-[0_1px_16px_rgba(0,0,0,0.06)]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 gap-6">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-[10px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-md shadow-rose-200 shrink-0">
            <UtensilsCrossed className="h-4.5 w-4.5 text-white" />
          </div>
          <span className=" text-[1.2rem] font-bold text-gray-900 dark:text-white leading-none">
            Food
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Hub
            </span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[13.5px] font-medium px-3 py-1.5 rounded-[9px] transition-all",
                pathname === link.href
                  ? "text-orange-600 bg-amber-50 dark:bg-zinc-800"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-[#f4f0eb] dark:hover:bg-zinc-800"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ── Desktop actions ── */}
        <div className="hidden md:flex items-center gap-2 shrink-0">

          {user ? (
            <>
              {/* Dashboard */}
              <Link
                href={dashRoute}
                className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] border text-[13px] font-semibold text-gray-700 hover:border-orange-300 hover:bg-amber-50 hover:text-orange-600 transition-all border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 dark:text-white"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[#f4f0eb] text-[13px] font-semibold text-gray-600 hover:bg-[#ece7de] hover:text-gray-900 transition-all border-none cursor-pointer dark:bg-zinc-800 dark:text-gray-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[10px] bg-linear-to-br from-orange-500 to-rose-600 text-[13px] font-semibold text-white shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all"
            >
              <LogIn className="h-3.5 w-3.5" />
              Login
            </Link>
          )}
                    <ModeToggle />
        </div>

        {/* ── Mobile hamburger ── */}
        <div className="md:hidden shrink-0">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="w-9 h-9 rounded-[10px] border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center hover:border-orange-300 hover:bg-amber-50 transition-all">
                <Menu className="h-4.5 w-4.5 text-gray-700" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-70 p-0 border-l border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex flex-col h-full">

                {/* Drawer header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0">
                      <UtensilsCrossed className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className=" text-[1rem] font-bold text-gray-900 dark:text-white">
                      Food
                      <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                        Hub
                      </span>
                    </span>
                  </Link>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-0.5 px-3 py-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-[14.5px] font-medium px-3 py-2.5 rounded-[10px] transition-all",
                        pathname === link.href
                          ? "text-orange-600 bg-amber-50 dark:bg-zinc-800"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-[#f4f0eb] dark:hover:bg-zinc-800"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mx-4 h-px bg-gray-100" />

                {/* Mobile auth actions */}
                <div className="flex flex-col gap-2.5 px-4 py-4 mt-auto">
                  <ModeToggle />
                  {user ? (
                    <>
                      {/* User pill */}
                      <div className="flex items-center gap-2.5 bg-amber-50 dark:bg-zinc-900 border border-amber-200 dark:border-gray-900 rounded-xl px-3 py-2.5">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center text-[11px] font-bold text-white  shrink-0">
                          {initials(user.name ?? "")}
                        </div>
                        <div>
                          <p className="font-semibold text-[13px] text-amber-900">{user.name}</p>
                          <p className="text-[11px] text-amber-600 capitalize">{user.role?.toLowerCase()}</p>
                        </div>
                      </div>

                      <Link
                        href={dashRoute}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-200 dark:border-gray-900  bg-white dark:bg-zinc-900 text-[13.5px] font-semibold text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-zinc-900 hover:bg-amber-50 hover:text-orange-600 transition-all"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[#f4f0eb] dark:bg-zinc-900 text-[13.5px] font-semibold text-gray-600 dark:text-gray-300 hover:bg-[#ece7de] hover:text-gray-900 dark:hover:text-gray-300 transition-all border-none cursor-pointer "
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 h-10 rounded-xl bg-linear-to-br from-orange-500 to-rose-600 text-[13.5px] font-semibold text-white shadow-md shadow-rose-200 transition-all"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}