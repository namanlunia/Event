"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import { MOCK_BLOGS } from "@/data/mockDatabase";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = MOCK_BLOGS.find((b) => b.slug === slug) || MOCK_BLOGS[0];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Announcements & Guides</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-red-primary/20 text-red-bright border border-red-primary/40 font-bold">
              {post.category}
            </span>
            <span className="text-text-muted flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.published_at}
            </span>
            <span className="text-text-muted flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.reading_time}
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            {post.summary}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-white/10"
              />
              <div>
                <div className="text-sm font-bold text-white">
                  {post.author.name}
                </div>
                <div className="text-xs text-text-muted font-mono">
                  {post.author.role}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article link copied to clipboard!");
                }
              }}
              className="p-2 rounded-lg bg-surface-1 border border-white/10 text-text-muted hover:text-white transition-colors"
              title="Copy shareable link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-72 sm:h-96 object-cover rounded-3xl border border-white/10 shadow-2xl"
          />
        </div>

        {/* Content Body */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 text-text-secondary leading-relaxed text-sm sm:text-base">
          <p>{post.content}</p>

          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white pt-4">
            Key Recommendations for this Sprint
          </h3>
          <p>
            When submitting a pull request, remember that clarity in your git commit messages and thorough testing drastically reduces review turnaround times. Our technical mentors review dozens of submissions every evening. A pull request that includes reproducible steps, test logs, and an explanation of edge cases is always prioritized.
          </p>

          <div className="p-4 rounded-xl bg-surface-2 border border-red-primary/30 my-6">
            <h4 className="font-heading font-bold text-sm text-white mb-1">
              Pro-Tip from Lead Maintainers:
            </h4>
            <p className="text-xs text-text-muted font-mono">
              Always link the issue in your PR description: &ldquo;Closes #14&rdquo; or &ldquo;Fixes #28&rdquo;. This triggers automated webhook listeners and points ledger sync.
            </p>
          </div>

          <p>
            For questions or debugging help, don&apos;t hesitate to drop your thoughts in the respective Discord project channel. We are building something enduring together this winter.
          </p>
        </div>
      </div>
    </div>
  );
}
