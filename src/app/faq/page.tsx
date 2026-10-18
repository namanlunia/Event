"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Search, ArrowRight, MessageSquare } from "lucide-react";
import { getFAQItems } from "@/lib/dataService";

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = ["All", "General", "Contributors", "Mentors", "Ambassadors", "Points & Rewards"];
  const allFaqs = getFAQItems();

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((f) => {
      const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
      const matchesSearch =
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Guidance</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Clear, transparent answers about participating, points tabulation, mentors, and program deliverables.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword (e.g. points, eligibility, certificates)..."
            className="w-full pl-10 pr-4 py-3 bg-surface-1 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-text-muted focus:outline-none focus:border-red-primary/60"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors border ${
                selectedCategory === cat
                  ? "bg-red-primary text-white border-red-bright shadow-red-glow-sm"
                  : "bg-surface-1 text-text-secondary hover:text-white border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-16">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-red-bright uppercase font-bold block">
                      {faq.category}
                    </span>
                    <span className="font-heading font-bold text-sm sm:text-base text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-red-bright transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact fallback */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 text-center space-y-3">
          <MessageSquare className="w-6 h-6 text-red-bright mx-auto" />
          <h3 className="font-heading font-bold text-lg text-white">
            Didn&apos;t find what you were looking for?
          </h3>
          <p className="text-xs text-text-secondary max-w-sm mx-auto">
            Our organizers and track leads are active around the clock in the community Discord and email support.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-semibold shadow-red-glow transition-all"
            >
              <span>Contact Support Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
