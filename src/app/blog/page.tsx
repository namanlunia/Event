import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, User } from "lucide-react";
import { MOCK_BLOGS } from "@/data/mockDatabase";

export const metadata = {
  title: "Blog & Announcements — Omnikon Winter of Code",
  description:
    "Read the latest updates, engineering tutorials, contributor guides, and community spotlights from OWOC 2024–25.",
};

export default function BlogPage() {
  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Community Dispatch</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Announcements & Guides
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Stay updated with weekly sprint briefs, contributor playbooks, and stories from our student developers.
          </p>
        </div>

        {/* Featured Post */}
        {MOCK_BLOGS.length > 0 && (
          <Link
            href={`/blog/${MOCK_BLOGS[0].slug}`}
            className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10 hover:border-red-primary/50 block mb-14 group transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MOCK_BLOGS[0].cover_image}
                alt={MOCK_BLOGS[0].title}
                className="w-full h-64 sm:h-80 object-cover rounded-2xl border border-white/10 group-hover:scale-[1.01] transition-transform"
              />
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-red-primary/20 text-red-bright border border-red-primary/40 font-bold">
                    {MOCK_BLOGS[0].category}
                  </span>
                  <span className="text-text-muted flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {MOCK_BLOGS[0].published_at}
                  </span>
                  <span className="text-text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {MOCK_BLOGS[0].reading_time}
                  </span>
                </div>

                <h2 className="font-heading font-black text-2xl sm:text-4xl text-white group-hover:text-red-bright transition-colors leading-tight">
                  {MOCK_BLOGS[0].title}
                </h2>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {MOCK_BLOGS[0].summary}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={MOCK_BLOGS[0].author.avatar}
                    alt={MOCK_BLOGS[0].author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">
                      {MOCK_BLOGS[0].author.name}
                    </div>
                    <div className="text-[10px] text-text-muted">
                      {MOCK_BLOGS[0].author.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Remaining Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BLOGS.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/40 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-44 object-cover rounded-xl border border-white/5 mb-4 group-hover:scale-[1.01] transition-transform"
                />
                <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted mb-2">
                  <span className="text-red-bright font-bold">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.reading_time}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-red-bright transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 mb-4">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-text-muted text-[11px]">
                    {post.author.name}
                  </span>
                </div>
                <span className="text-red-bright group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
