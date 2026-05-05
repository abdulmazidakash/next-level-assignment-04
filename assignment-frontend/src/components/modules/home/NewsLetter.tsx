"use client";

import { useState } from "react";
import { Mail, Sparkles, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="relative bg-background py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(255,107,53,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-white/8 rounded-4xl px-8 py-12 md:px-16 md:py-16 text-center relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-black/65 dark:text-white/65 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
            <Mail className="h-3.5 w-3.5 text-orange-400" />
            Newsletter
          </div>

          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-black dark:text-white leading-tight mb-3">
            Get Exclusive Deals{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Straight to You
            </span>
          </h2>
          <p className="text-[15px] text-black/40 dark:text-white/40 max-w-lg mx-auto leading-relaxed mb-8">
            Subscribe and be the first to know about special offers, new
            restaurants, and limited-time discounts every week.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2.5 bg-green-500/10 border border-green-500/25 text-green-300 text-[14px] font-semibold px-6 py-3.5 rounded-2xl">
              <CheckCircle2 className="h-4.5 w-4.5" />
              You&apos;re subscribed! Check your inbox for a welcome gift 🎉
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email address"
                  className="w-full h-12 px-4 rounded-2xl bg-input border border-white/12 text-white dark:text-white text-[13.5px] placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all"
                />
                {error && (
                  <p className="text-[11.5px] text-rose-400 mt-1.5 text-left">
                    {error}
                  </p>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 text-white text-[13.5px] font-semibold shadow-md shadow-rose-900/40 hover:shadow-rose-900/60 hover:-translate-y-0.5 transition-all shrink-0"
              >
                <Sparkles className="h-4 w-4" />
                Subscribe
              </button>
            </div>
          )}

          <p className="text-[11.5px] text-black/25 dark:text-white/25 mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}