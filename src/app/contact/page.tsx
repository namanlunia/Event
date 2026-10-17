"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    track: "Contributor Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Support & Communications</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Connect with the OWOC Council
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Have an inquiry regarding repository onboarding, mentor allocation, points adjustment, or sponsorship? Reach out to us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact Information & Channels */}
          <div className="space-y-4">
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="p-2.5 rounded-xl bg-surface-2 border border-white/5 w-fit text-red-bright">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                Official Email
              </h3>
              <p className="text-xs text-text-muted">
                Direct queries to organizing chairs:
              </p>
              <a
                href="mailto:contact@owoc.omnikon.org"
                className="font-mono text-xs text-red-bright hover:underline block"
              >
                contact@owoc.omnikon.org
              </a>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="p-2.5 rounded-xl bg-surface-2 border border-white/5 w-fit text-red-bright">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                Discord Community
              </h3>
              <p className="text-xs text-text-muted">
                Fastest response for technical queries:
              </p>
              <a
                href="https://discord.gg/omnikon"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-red-bright hover:underline block"
              >
                discord.gg/omnikon
              </a>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="p-2.5 rounded-xl bg-surface-2 border border-white/5 w-fit text-red-bright">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                Support Hours
              </h3>
              <p className="text-xs text-text-secondary">
                24/7 Community Discord Coverage
              </p>
              <p className="text-[11px] text-text-muted">
                Email inquiries replied to within 24–48 hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    Message Dispatched!
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto">
                    Thank you for reaching out. An OWOC organizer will review your inquiry and respond to {formData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        track: "Contributor Inquiry",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-surface-2 border border-white/10 text-xs text-white hover:border-white/20"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-text-muted block mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Aarav Patel"
                        className="w-full bg-surface-1 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-primary/60"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-text-muted block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@university.edu"
                        className="w-full bg-surface-1 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-primary/60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-text-muted block mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) =>
                        setFormData({ ...formData, track: e.target.value })
                      }
                      className="w-full bg-surface-1 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-primary/60"
                    >
                      <option value="Contributor Inquiry">
                        Contributor & Issues Help
                      </option>
                      <option value="Mentor Application">
                        Mentor & Evaluation Questions
                      </option>
                      <option value="Project Submission">
                        Project Repository Submission
                      </option>
                      <option value="Campus Ambassador">
                        Campus Ambassador Referral Queries
                      </option>
                      <option value="Sponsorship & Partnership">
                        Corporate Sponsorship & Bounties
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-text-muted block mb-1">
                      Your Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please provide details about your question, project, or organization..."
                      className="w-full bg-surface-1 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-primary/60"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright hover:shadow-red-glow text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Organizers</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
