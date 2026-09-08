"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { NavLocation } from "@/lib/locations";

interface QRCodeModalProps {
  location: NavLocation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeModal({ location, isOpen, onClose }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");

  const origin = typeof window !== "undefined" ? window.location.origin : "https://campusnav.ktc";
  const shareUrl = location ? `${origin}/map?start=${encodeURIComponent(location.id)}` : "";

  useEffect(() => {
    if (!shareUrl) return;

    QRCode.toString(shareUrl, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 2,
      color: {
        dark: "#0F172A",
        light: "#FFFFFF",
      },
    })
      .then((svg) => {
        setSvgContent(svg);
      })
      .catch((err) => {
        console.error("Failed to generate QR Code", err);
      });
  }, [shareUrl]);

  if (!isOpen || !location) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Overlay backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col items-center gap-4 text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          ✕
        </button>

        {/* Location Header */}
        <div>
          <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-orange-200/60">
            📍 You Are Here QR Code
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {location.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Door Node: <span className="font-mono font-bold text-slate-700">{location.nodeId}</span> • {location.subtitle}
          </p>
        </div>

        {/* Scannable SVG QR Code */}
        <div className="my-1 flex flex-col items-center justify-center bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm relative">
          {svgContent ? (
            <div
              className="w-48 h-48 sm:w-56 sm:h-56"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center text-xs text-slate-400">
              Generating Scannable QR...
            </div>
          )}
        </div>

        <p className="text-[11.5px] text-slate-600 max-w-xs leading-relaxed">
          Scan this QR Code with any smartphone camera app to set <strong>{location.name}</strong> as your starting location!
        </p>

        {/* Link box */}
        <div className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="text-xs font-mono bg-transparent text-slate-600 outline-none truncate w-full px-1"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all shadow-xs ${
              copied
                ? "bg-teal-600 text-white"
                : "bg-slate-900 hover:bg-orange-600 text-white"
            }`}
          >
            {copied ? "Copied! ✓" : "Copy Link"}
          </button>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider pt-2 border-t border-slate-100 w-full">
          Kalsekar Technical Campus • Indoor Nav System
        </div>
      </div>
    </div>
  );
}
