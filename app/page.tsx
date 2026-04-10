"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Link2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    eyebrow: "AI-powered content",
    title: "AI descriptions",
    text: "Turn rough notes into warm, professional copy that sells.",
    detail:
      "Write quick product notes in your own voice, then instantly transform them into polished descriptions that feel human, clear, and conversion-focused.",
  },
  {
    icon: Link2,
    eyebrow: "Instant storefront",
    title: "Shareable store link",
    text: "One beautiful page for your whole catalog — share anywhere.",
    detail:
      "Get a single, branded store link with your products, pricing, and contact details. Drop it in your bio, WhatsApp status, Instagram, and flyers.",
  },
  {
    icon: MessageCircle,
    eyebrow: "Built for buyer behavior",
    title: "WhatsApp-ready",
    text: "Let buyers message you on the channel they already use.",
    detail:
      "Each product can open a pre-filled WhatsApp message so customers ask fewer vague questions and move faster toward a purchase.",
  },
];

const testimonials = [
  {
    quote: "I got more orders the week I launched my HerBizReach page.",
    name: "Chioma O.",
    role: "Fashion retailer, Lagos",
  },
  {
    quote: "Finally a tool that looks good on my phone and takes minutes, not days.",
    name: "Amara K.",
    role: "Skincare brand, Abuja",
  },
  {
    quote: "The AI helped me sound professional without hiring a copywriter.",
    name: "Yemi T.",
    role: "Home decor, Port Harcourt",
  },
  {
    quote: "I shared my link once on WhatsApp status and sold out in two days.",
    name: "Bolanle A.",
    role: "Food business, Ibadan",
  },
  {
    quote: "Customers now see my full catalog without me sending 20 photos manually.",
    name: "Nneka U.",
    role: "Accessories seller, Enugu",
  },
  {
    quote: "The dashboard helped me know which products people actually care about.",
    name: "Ruth E.",
    role: "Beauty products, Benin City",
  },
];

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  useEffect(() => {
    const onResize = () => setItemsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [totalSlides]);

  const faqs = [
    {
      q: "Do I need technical skills to use HerBizReach?",
      a: "No. You can set up your store, add products, and start sharing in minutes from your phone.",
    },
    {
      q: "Can I use my own WhatsApp number?",
      a: "Yes. Your store and product buttons connect directly to your business WhatsApp number.",
    },
    {
      q: "Will my public store show on Google?",
      a: "Yes. Public store pages are server-rendered for strong SEO and social sharing previews.",
    },
    {
      q: "Can I switch off the chat widget?",
      a: "Absolutely. You can enable or disable the storefront chat widget anytime in Store Settings.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <header className="flex items-center justify-between px-4 py-4 md:px-8">
        <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--brand-primary)]">
          HerBizReach
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" className="min-h-10">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="min-h-10">
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -20%, var(--brand-glow), transparent), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(124,58,237,0.12), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(124,58,237,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.22) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 22%, rgba(167,139,250,0.22) 0%, transparent 24%), radial-gradient(circle at 78% 18%, rgba(124,58,237,0.2) 0%, transparent 28%), radial-gradient(circle at 72% 74%, rgba(124,58,237,0.16) 0%, transparent 26%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-25deg, rgba(124,58,237,0.3), rgba(124,58,237,0.3) 1px, transparent 1px, transparent 12px)",
          }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-xl text-center lg:text-left"
          >
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl">
              Your Business, Seen by More
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Built for bold women-led SMEs across Africa — share your catalog, glow up your copy with
              AI, and meet customers on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild className="min-h-12 px-8 text-base">
                <Link href="/register">Get started free</Link>
              </Button>
              <Button asChild variant="secondary" className="min-h-12 px-8 text-base">
                <Link href="/store/demo">View demo store</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="relative hidden w-full max-w-sm lg:block"
          >
            <Image
              src="/herbizzreach_mobile.png"
              alt="HerBizReach mobile app preview"
              width={342}
              height={663}
              priority
              className="mx-auto h-auto w-[min(100%,342px)] drop-shadow-[0_18px_36px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        </div>
      </section>

      <section className="border-t border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-sm)]"
              >
                <div className="flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--brand-glow)] text-[var(--brand-primary)]">
                  <Icon className="size-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  {f.eyebrow}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] font-bold text-[var(--text-primary)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{f.text}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{f.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--text-primary)]">
          What founders say
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[var(--text-muted)]">
          Real stories from women entrepreneurs using HerBizReach to grow visibility, simplify selling, and
          convert more chats into orders.
        </p>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden">
          <motion.div
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ duration: 0.35 }}
            className="flex"
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const start = slideIndex * itemsPerSlide;
              const slice = testimonials.slice(start, start + itemsPerSlide);

              return (
                <div key={slideIndex} className="w-full shrink-0">
                  <div className="grid gap-6 md:grid-cols-2">
                    {slice.map((t) => (
                      <motion.blockquote
                        key={t.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-sm)]"
                      >
                        <p className="text-sm leading-6 text-[var(--text-secondary)]">&ldquo;{t.quote}&rdquo;</p>
                        <footer className="mt-4 text-xs font-semibold text-[var(--brand-primary)]">
                          {t.name}
                          <span className="block font-normal text-[var(--text-muted)]">{t.role}</span>
                        </footer>
                      </motion.blockquote>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="icon"
            className="min-h-11 min-w-11"
            onClick={() => setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides)}
          >
            <ChevronLeft className="size-5" />
          </Button>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial slide ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 w-7 rounded-full transition ${
                i === activeIndex ? "bg-[var(--brand-primary)]" : "bg-[var(--border-strong)]"
              }`}
            />
          ))}
          <Button
            variant="secondary"
            size="icon"
            className="min-h-11 min-w-11"
            onClick={() => setActiveIndex((prev) => (prev + 1) % totalSlides)}
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </section>

      <section className="border-t border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-bold">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[var(--text-muted)]">
            Quick answers to common questions from first-time sellers and growing brands.
          </p>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-5"
              >
                <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-[var(--text-primary)]">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-12 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--brand-primary)]">
              HerBizReach
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)]">
              The visibility and sales toolkit built for women-led SMEs across Africa. Create your store,
              optimize product copy with AI, and convert buyer interest faster.
            </p>
            <div className="mt-5 flex gap-3">
              <Button asChild className="min-h-11">
                <Link href="/register">Start free</Link>
              </Button>
              <Button asChild variant="secondary" className="min-h-11">
                <Link href="/store/demo">Explore demo</Link>
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Product</p>
            <div className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
              <Link href="/register" className="block hover:text-[var(--brand-primary)]">
                Get started
              </Link>
              <Link href="/store/demo" className="block hover:text-[var(--brand-primary)]">
                Demo store
              </Link>
              <Link href="/login" className="block hover:text-[var(--brand-primary)]">
                Login
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Support</p>
            <div className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
              <a href="mailto:support@herbizreach.com" className="block hover:text-[var(--brand-primary)]">
                support@herbizreach.com
              </a>
              <a href="https://wa.me/2340000000000" className="block hover:text-[var(--brand-primary)]">
                WhatsApp support
              </a>
              <span className="block">Mon - Sat, 8:00 AM - 7:00 PM WAT</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-[var(--border-default)] pt-6 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} HerBizReach. All rights reserved.</span>
          <span>Made for Women in Tech Hackathon 2026</span>
        </div>
      </footer>
    </div>
  );
}
