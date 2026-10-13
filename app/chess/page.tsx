"use client"

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";

const ChessBoard = dynamic(() => import("./ChessBoard"), { ssr: false });

export default function ChessPage() {
  const [showWIP, setShowWIP] = useState(true);

  useEffect(() => {
  }, []);
  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0] flex flex-col justify-start items-center py-8 px-4 font-sans selection:bg-primary/30 selection:text-white">
      {/* Immersive Dark Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8 pb-4 border-b border-neutral-800/80">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 hover:text-white transition uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <div className="flex items-center gap-2.5">
          <Trophy className="text-[#C2410C] w-5.5 h-5.5" />
          <span className="text-sm font-bold tracking-widest uppercase text-white font-mono">
            Chess Arena
          </span>
        </div>
      </div>

      {showWIP && (
        <div className="bg-[#FFEDD5]/20 text-[#FB923C] border border-[#FED7AA]/30 px-6 py-2 rounded-full font-bold tracking-widest uppercase text-sm mb-6 animate-pulse transition-opacity duration-500">
          Work in Progress
        </div>
      )}

      {/* Main Board & Sidechat Widget */}
      <main className="w-full flex-1 flex flex-col justify-center items-center">
        <ChessBoard />
      </main>

      <footer className="mt-8 text-[11px] text-neutral-600 font-mono tracking-wider">
        CHESS ENGINE POWERED BY STOCKFISH EVALUATION & LOCAL MINIMAX
      </footer>
    </div>
  );
}
