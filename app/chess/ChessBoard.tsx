'use client';

export default function ChessBoard() {
  return (
    <div className="w-full max-w-lg aspect-square bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center gap-4">
      <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-2xl">
        ♟️
      </div>
      <h3 className="text-xl font-bold text-white">Interactive Chess Arena</h3>
      <p className="text-sm text-neutral-400 max-w-sm">
        Stockfish engine integration and local minimax AI evaluation module is currently under development.
      </p>
    </div>
  );
}
