"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, CheckCheck, ExternalLink, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-surface-1 border border-white/10 text-text-secondary hover:text-white relative transition-colors"
        aria-label="Notification Center"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.2 min-w-4 h-4 rounded-full bg-red-bright text-[10px] font-mono font-bold text-white flex items-center justify-center animate-pulse shadow-red-glow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-1/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xs text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-primary/20 text-red-bright font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] font-mono text-text-muted hover:text-white flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-text-muted">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    notif.is_read
                      ? "bg-surface-2/40 border-white/5 opacity-75"
                      : "bg-surface-2 border-red-primary/30 shadow-red-glow-sm"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex-shrink-0">
                      {notif.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : notif.type === "alert" || notif.type === "warning" ? (
                        <AlertCircle className="w-4 h-4 text-red-bright" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white truncate">
                          {notif.title}
                        </span>
                        {!notif.is_read && (
                          <span className="w-2 h-2 rounded-full bg-red-bright flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-text-secondary leading-snug mt-0.5">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5">
                        <span className="text-[9px] font-mono text-text-muted">
                          {new Date(notif.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {notif.link && (
                          <Link
                            href={notif.link}
                            onClick={() => setIsOpen(false)}
                            className="text-[10px] font-mono text-red-bright hover:underline flex items-center gap-1"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
