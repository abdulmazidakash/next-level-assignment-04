"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavbarProps {
  user?: {
    name: string
    role: "CUSTOMER" | "PROVIDER" | "ADMIN"
  } | null
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
  ]

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          FoodHub 🍱
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user?.role === "CUSTOMER" && (
            <Link href="/orders" className="text-sm font-medium">
              My Orders
            </Link>
          )}

          {user?.role === "PROVIDER" && (
            <Link href="/provider/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link href="/admin/dashboard" className="text-sm font-medium">
              Admin
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {!user ? (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-6">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.href}>
                      {link.name}
                    </Link>
                  ))}

                  {user?.role === "CUSTOMER" && (
                    <Link href="/orders">My Orders</Link>
                  )}

                  {user?.role === "PROVIDER" && (
                    <Link href="/provider/dashboard">
                      Dashboard
                    </Link>
                  )}

                  {user?.role === "ADMIN" && (
                    <Link href="/admin/dashboard">
                      Admin
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}