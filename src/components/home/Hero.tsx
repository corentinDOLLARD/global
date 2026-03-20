"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Diamond, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Animated Background - Liquid Glass blobs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(202,138,4,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(202,138,4,0.08)_0%,_transparent_50%)]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(202,138,4,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(202,138,4,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Morphing gold orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gold/10 blur-[80px] animate-morph"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-gold/5 blur-[100px] animate-morph"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2.5 liquid-glass-dark text-white/70 text-sm font-medium px-5 py-2.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Shopping Premium Moderne &mdash; Collection 2026
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tight"
          >
            L&apos;&eacute;l&eacute;gance
            <br />
            <span className="text-gold-gradient">r&eacute;invent&eacute;e</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-white/45 max-w-xl leading-relaxed"
          >
            De la haute couture &agrave; la tech, du design d&apos;int&eacute;rieur au sport
            &mdash; d&eacute;couvrez une s&eacute;lection premium fa&ccedil;onn&eacute;e par les
            plus grands artisans et les marques les plus innovantes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-gold/20 cursor-pointer"
            >
              Explorer les collections
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/products?category=electronics"
              className="inline-flex items-center gap-3 liquid-glass-dark text-white/80 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 cursor-pointer"
            >
              <Diamond className="h-4 w-4 text-gold" />
              Nouveaut&eacute;s Tech
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 flex gap-12 sm:gap-16"
          >
            {[
              { value: "150+", label: "Artisans & Marques" },
              { value: "7", label: "Univers &agrave; explorer" },
              { value: "100%", label: "Qualit&eacute; certifi&eacute;e" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-heading font-bold text-gold">
                  {stat.value}
                </div>
                <div
                  className="text-sm text-white/30 mt-1"
                  dangerouslySetInnerHTML={{ __html: stat.label }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-gold/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
