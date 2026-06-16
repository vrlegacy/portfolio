"use client"

import React from "react";
import dynamic from "next/dynamic";
import TransitionLink from "@/components/TransitionLink";
import { ArrowLeft, Trophy } from "lucide-react";

const ChessBoard = dynamic(() => import("../components/ChessBoard"), { ssr: false });

export default function ChessPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0] flex flex-col justify-start items-center py-8 px-4 font-sans selection:bg-primary/30 selection:text-white">
      {/* Immersive Dark Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8 pb-4 border-b border-neutral-800/80">
        <TransitionLink
          href="/"
          className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 hover:text-white transition uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </TransitionLink>
        <div className="flex items-center gap-2.5">
          <Trophy className="text-primary w-5.5 h-5.5" />
          <span className="text-sm font-bold tracking-widest uppercase text-white font-mono">
            Chess Arena
          </span>
        </div>
      </div>

      {/* Main Board & Sidechat Widget */}
      <main className="w-full flex-1 flex flex-col justify-center items-center">
        <ChessBoard />
      </main>

      {/* Footer copyright or info */}
      <footer className="mt-8 text-[11px] text-neutral-600 font-mono tracking-wider">
        CHESS ENGINE POWERED BY STOCKFISH EVALUATION & LOCAL MINIMAX
      </footer>
    </div>
  );
}
