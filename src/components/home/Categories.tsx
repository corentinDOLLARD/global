"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/products";

export default function Categories() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Nos Univers
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Explorer par collection
          </h2>
        </motion.div>

        {/* Top row - 4 luxury categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {categories.slice(0, 4).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/products?category=${cat.id}`}
                className="group relative block aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-white text-xl font-heading font-bold">
                        {cat.name}
                      </h3>
                      <p className="text-white/50 text-sm mt-1">
                        {cat.productCount} pi&egrave;ces
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-full group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom row - 3 lifestyle categories */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.slice(4).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 4) * 0.1 }}
            >
              <Link
                href={`/products?category=${cat.id}`}
                className="group relative block aspect-[16/9] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-white text-xl font-heading font-bold">
                        {cat.name}
                      </h3>
                      <p className="text-white/50 text-sm mt-1">
                        {cat.productCount} pi&egrave;ces
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-full group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
