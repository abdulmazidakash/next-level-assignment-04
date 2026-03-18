import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Heart,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-gray-50 to-gray-100 mt-20 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
              <span>🍱</span>
              <span>FoodHub</span>
            </h2>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed max-w-xs">
              Discover and order delicious meals from the best local providers — fast, fresh, and reliable.
            </p>

            {/* Social Icons with hover animation */}
            <div className="mt-6 flex items-center gap-4">
              {[
                { Icon: Facebook,   href: "#", color: "hover:text-blue-600"   },
                { Icon: Instagram,  href: "#", color: "hover:text-pink-600"   },
                { Icon: Twitter,    href: "#", color: "hover:text-sky-500"    },
                { Icon: Linkedin,   href: "#", color: "hover:text-blue-700"   },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full 
                    bg-gray-200/70 text-gray-700 transition-all duration-300 
                    hover:bg-white hover:shadow-md hover:scale-110 hover:-translate-y-0.5
                    ${item.color}
                  `}
                  aria-label={`Follow us on ${item.Icon.name}`}
                >
                  <item.Icon className="h-5 w-5" strokeWidth={2.2} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
              <li><Link href="/meals" className="hover:text-orange-600 transition-colors">Meals</Link></li>
              <li><Link href="/providers" className="hover:text-orange-600 transition-colors">Providers</Link></li>
              <li><Link href="/how-it-works" className="hover:text-orange-600 transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 tracking-wide">Support</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href="mailto:support@foodhub.com" className="hover:text-orange-600 transition-colors">
                  support@foodhub.com
                </a>
              </li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 tracking-wide">Legal</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/50 py-5 text-center text-sm text-gray-500">
        <p>
          © {currentYear} FoodHub. Made with{' '}
          <Heart className="inline h-4 w-4 text-red-500 mx-1 fill-red-500" strokeWidth={0} />{' '}
          in the pursuit of great food.
        </p>
      </div>
    </footer>
  );
}