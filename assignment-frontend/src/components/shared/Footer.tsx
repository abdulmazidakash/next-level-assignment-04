"use client"
import {
  Facebook, Instagram, Twitter, Linkedin,
  Heart, UtensilsCrossed, ArrowRight,
} from "lucide-react"
import Link from "next/link"

const QUICK_LINKS = [
  { name: "Home",         href: "/" },
  { name: "Meals",        href: "/meals" },
  { name: "Providers",    href: "/providers" },
  { name: "How It Works", href: "/how-it-works" },
]

const SUPPORT_LINKS = [
  { name: "support@foodhub.com", href: "mailto:support@foodhub.com" },
  { name: "Help Center",         href: "#" },
  { name: "Contact Us",          href: "/contact" },
  { name: "FAQ",                 href: "#" },
]

const LEGAL_LINKS = [
  { name: "Privacy Policy",  href: "#" },
  { name: "Cookie Policy",   href: "#" },
  { name: "Refund Policy",   href: "#" },
  { name: "Terms of Service",href: "#" },
]

const SOCIALS = [
  {
    Icon: Facebook,
    href: "#",
    label: "Facebook",
  },
  {
    Icon: Instagram,
    href: "#",
    label: "Instagram",
  },
  {
    Icon: Twitter,
    href: "#",
    label: "Twitter / X",
  },
  {
    Icon: Linkedin,
    href: "#",
    label: "LinkedIn",
  },
]

function FooterLinkList({ links }: { links: { name: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {links.map(({ name, href }) => (
        <li key={name}>
          <Link
            href={href}
            className="group flex items-center gap-1.5 text-[13.5px] text-white/50 hover:text-white transition-colors"
          >
            <ArrowRight className="h-3 w-3 text-orange-500/70 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-[#1a1108] to-[#0f0903] mt-20">

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* ── Brand ── */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-900/40 flex-shrink-0">
                <UtensilsCrossed className="h-[18px] w-[18px] text-white" />
              </div>
              <span className="font-[family-name:var(--font-display,serif)] text-[1.2rem] font-bold text-white leading-none">
                Food
                <span className="bg-gradient-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                  Hub
                </span>
              </span>
            </div>

            <p className="text-[13.5px] text-white/45 leading-relaxed max-w-[240px] mb-6">
              Discover and order delicious meals from the best local providers — fast, fresh, and reliable.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-[10px] border border-white/10 bg-white/6 flex items-center justify-center text-white/55 hover:text-orange-400 hover:bg-orange-500/15 hover:border-orange-500/40 hover:-translate-y-0.5 transition-all"
                >
                  <Icon className="h-[15px] w-[15px]" strokeWidth={2.2} />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-4">
              Quick Links
            </p>
            <FooterLinkList links={QUICK_LINKS} />
          </div>

          {/* ── Support ── */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-4">
              Support
            </p>
            <FooterLinkList links={SUPPORT_LINKS} />
          </div>

          {/* ── Legal ── */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 mb-4">
              Legal
            </p>
            <FooterLinkList links={LEGAL_LINKS} />
          </div>
        </div>

        {/* ── Newsletter strip ── */}
        <div className="mt-12 pt-10 border-t border-white/[0.07] flex items-center justify-between flex-wrap gap-5">
          <div>
            <h4 className="font-[family-name:var(--font-display,serif)] text-base font-bold text-white mb-1">
              Stay in the loop
            </h4>
            <p className="text-[12.5px] text-white/40">
              Get new restaurants and deals delivered to your inbox
            </p>
          </div>
          <form className="flex gap-2 flex-wrap" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="h-[38px] px-4 rounded-[10px] border border-white/12 bg-white/7 text-white text-[13px] placeholder:text-white/30 outline-none focus:border-orange-500/50 transition-colors min-w-[200px] font-[family-name:var(--font-sans)]"
            />
            <button
              type="submit"
              className="h-[38px] px-4 rounded-[10px] border-none bg-gradient-to-br from-orange-500 to-rose-600 text-white text-[13px] font-semibold shadow-md shadow-rose-900/40 hover:shadow-rose-900/60 hover:-translate-y-0.5 transition-all cursor-pointer font-[family-name:var(--font-sans)] whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between flex-wrap gap-3">
          <p className="text-[12.5px] text-white/30 flex items-center gap-1.5">
            © {currentYear} FoodHub. Made with
            <Heart className="inline h-3 w-3 fill-rose-500 text-rose-500 mx-0.5" strokeWidth={0} />
            in the pursuit of great food.
          </p>
          <div className="flex gap-4 flex-wrap">
            {["Privacy", "Terms", "Cookies"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-[12px] text-white/30 hover:text-white/70 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}