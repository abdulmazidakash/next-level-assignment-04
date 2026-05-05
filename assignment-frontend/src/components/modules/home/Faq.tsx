"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How long does delivery usually take?",
    a: "Most orders are delivered within 25–40 minutes depending on your location and restaurant. You can track your order in real-time through the app.",
  },
  {
    q: "Is cash on delivery available?",
    a: "Yes! We offer cash on delivery for all orders across Dhaka. We also accept bKash, Nagad, Rocket, and all major credit/debit cards.",
  },
  {
    q: "What is the minimum order amount?",
    a: "The minimum order amount varies by restaurant, but is typically around ৳150–৳200. You can see the minimum for each restaurant on their page.",
  },
  {
    q: "Can I schedule a delivery in advance?",
    a: "Yes, you can schedule orders up to 24 hours in advance. Simply select your preferred delivery time at checkout.",
  },
  {
    q: "What if my order is wrong or missing items?",
    a: "Please contact our support team within 30 minutes of delivery. We will resolve the issue immediately with a refund or a replacement order at no extra cost.",
  },
  {
    q: "Do you deliver outside Dhaka?",
    a: "Currently we operate in Dhaka city. We are actively expanding to Chittagong, Sylhet, and other major cities — stay tuned for updates!",
  },
  {
    q: "How do I become a partner restaurant?",
    a: "Visit our Providers page and fill in the application form. Our team will review your application and get back to you within 3 business days.",
  },
  {
    q: "Are there any delivery charges?",
    a: "Delivery charges depend on the restaurant and your distance. Many restaurants offer free delivery for orders above a certain amount, shown on their page.",
  },
];

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-orange-500/30 bg-card" : "border-white/8 bg-card"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-4.5 text-left"
      >
        <span className={`text-[14px] font-semibold transition-colors duration-200 ${open ? "text-black dark:text-white" : "text-black/70 dark:text-white/70"}`}>
          {q}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-orange-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-6 pb-5 text-[13.5px] text-black/45 dark:text-white/45 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-background py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-black/65 dark:text-white/65 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            <HelpCircle className="h-3.5 w-3.5 text-orange-400" />
            Got Questions?
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-black dark:text-white leading-tight mb-3">
            Frequently Asked{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-[15px] text-black/40 dark:text-white/40 max-w-120 mx-auto leading-relaxed">
            Everything you need to know about ordering with FoodHub. Can&apos;t
            find an answer? Contact our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[13.5px] text-black/35 dark:text-white/35">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-orange-400 font-semibold hover:text-orange-300 transition-colors underline underline-offset-2"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}