/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getUser, UserLogOut } from "@/services/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  // 🔥 Get Dashboard Route Based on Role
  const getDashboardRoute = () => {
    if (!user) return "/";

    switch (user.role) {
      case "ADMIN":
        return "/dashboard";
      case "PROVIDER":
        return "/dashboard";
      case "CUSTOMER":
        return "/dashboard";
      default:
        return "/";
    }
  };

  const handleLogout = async () => {
    await UserLogOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-primary">
          FoodHub 🍱
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link href={getDashboardRoute()}>
                <Button variant="outline">Dashboard</Button>
              </Link>

              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </nav>

        {/* MOBILE NAV */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-6 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium hover:text-primary transition"
                  >
                    {link.name}
                  </Link>
                ))}

                {user ? (
                  <>
                    <Link
                      href={getDashboardRoute()}
                      onClick={() => setOpen(false)}
                    >
                      <Button className="w-full" variant="outline">
                        Dashboard
                      </Button>
                    </Link>

                    <Button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}