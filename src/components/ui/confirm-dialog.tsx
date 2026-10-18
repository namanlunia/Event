"use client";

import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  requiredConfirmationWord?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = "Confirm Action",
  cancelText = "Cancel",
  requiredConfirmationWord,
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [inputWord, setInputWord] = useState("");

  if (!isOpen) return null;

  const isConfirmationValid = requiredConfirmationWord
    ? inputWord.trim().toLowerCase() === requiredConfirmationWord.trim().toLowerCase()
    : true;

  const handleConfirm = () => {
    if (isConfirmationValid) {
      onConfirm();
      setInputWord("");
    }
  };

  const handleCancel = () => {
    setInputWord("");
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative">
        <button
          onClick={handleCancel}
          className="absolute top-5 right-5 text-text-muted hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
              isDestructive
                ? "bg-red-primary/15 border-red-primary/40 text-red-bright shadow-red-glow-sm"
                : "bg-amber-500/15 border-amber-500/40 text-amber-400"
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">{title}</h2>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed mb-6">
          {description}
        </p>

        {requiredConfirmationWord && (
          <div className="mb-6 space-y-2">
            <label className="text-[11px] font-mono text-text-muted block">
              Type <strong className="text-white font-mono uppercase">{requiredConfirmationWord}</strong> to confirm:
            </label>
            <input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              placeholder={requiredConfirmationWord}
              className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-primary"
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-1 text-text-secondary hover:text-white text-xs font-medium border border-white/10 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmationValid}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              isDestructive
                ? "bg-red-primary hover:bg-red-bright text-white shadow-red-glow-sm disabled:opacity-50 disabled:pointer-events-none"
                : "bg-white hover:bg-zinc-200 text-black font-semibold disabled:opacity-50 disabled:pointer-events-none"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
