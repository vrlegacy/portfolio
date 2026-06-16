import { Chess } from "chess.js";

/**
 * Robust Chess Bot Move Solver.
 * Attempts to call the public Stockfish Online API for high-quality moves.
 * If offline, rate-limited, or failed, falls back to a smart local Minimax chess engine.
 */
export async function getBestMove(fen: string, skill: number = 10): Promise<string | null> {
  try {
    // Attempting Stockfish Online API (v2)
    const url = `https://stockfish.online/api/s/v2.php?fen=${encodeURIComponent(fen)}&depth=${Math.min(12, Math.max(5, Math.floor(skill / 1.5)))}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2-second timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.bestmove) {
        // Example: "bestmove e2e4 ponder e7e5" -> "e2e4"
        const movePart = data.bestmove.split(" ")[1];
        if (movePart && movePart.length >= 4) {
          return movePart;
        }
      }
    }
  } catch (error) {
    console.warn("Stockfish API offline/failed. Falling back to local engine.", error);
  }

  // Fallback: Local minimax chess AI
  return getLocalBestMove(fen);
}

// Simple piece values
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Piece-Square Tables for positional play (from Black's perspective, or symmetric)
const PAWN_PST = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5,  5, 10, 25, 25, 10,  5,  5],
  [0,  0,  0, 20, 20,  0,  0,  0],
  [5, -5,-10,  0,  0,-10, -5,  5],
  [5, 10, 10,-20,-20, 10, 10,  5],
  [0,  0,  0,  0,  0,  0,  0,  0]
];

const KNIGHT_PST = [
  [-50,-40,-30,-30,-30,-30,-40,-50],
  [-40,-20,  0,  0,  0,  0,-20,-40],
  [-30,  0, 10, 15, 15, 10,  0,-30],
  [-30,  5, 15, 20, 20, 15,  5,-30],
  [-30,  0, 15, 20, 20, 15,  0,-30],
  [-30,  5, 10, 15, 15, 10,  5,-30],
  [-40,-20,  0,  5,  5,  0,-20,-40],
  [-50,-40,-30,-30,-30,-30,-40,-50]
];

const BISHOP_PST = [
  [-20,-10,-10,-10,-10,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5, 10, 10,  5,  0,-10],
  [-10,  5,  5, 10, 10,  5,  5,-10],
  [-10,  0, 10, 10, 10, 10,  0,-10],
  [-10, 10, 10, 10, 10, 10, 10,-10],
  [-10,  5,  0,  0,  0,  0,  5,-10],
  [-20,-10,-10,-10,-10,-10,-10,-20]
];

const ROOK_PST = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [5, 10, 10, 10, 10, 10, 10,  5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [0,  0,  0,  5,  5,  0,  0,  0]
];

const QUEEN_PST = [
  [-20,-10,-10, -5, -5,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5,  5,  5,  5,  0,-10],
  [-5,  0,  5,  5,  5,  5,  0, -5],
  [0,  0,  5,  5,  5,  5,  0, -5],
  [-10,  5,  5,  5,  5,  5,  0,-10],
  [-10,  0,  5,  0,  0,  5,  0,-10],
  [-20,-10,-10, -5, -5,-10,-10,-20]
];

const KING_PST = [
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-20,-30,-30,-40,-40,-30,-30,-20],
  [-10,-20,-20,-20,-20,-20,-20,-10],
  [20, 20,  0,  0,  0,  0, 20, 20],
  [20, 30, 10,  0,  0, 10, 30, 20]
];

function evaluateBoard(board: any[][], activeColor: string): number {
  let score = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece) {
        let val = PIECE_VALUES[piece.type] || 0;
        let pstVal = 0;
        
        // Add positional bonus based on piece type
        if (piece.type === 'p') pstVal = PAWN_PST[piece.color === 'w' ? 7 - r : r][c];
        else if (piece.type === 'n') pstVal = KNIGHT_PST[piece.color === 'w' ? 7 - r : r][c];
        else if (piece.type === 'b') pstVal = BISHOP_PST[piece.color === 'w' ? 7 - r : r][c];
        else if (piece.type === 'r') pstVal = ROOK_PST[piece.color === 'w' ? 7 - r : r][c];
        else if (piece.type === 'q') pstVal = QUEEN_PST[piece.color === 'w' ? 7 - r : r][c];
        else if (piece.type === 'k') pstVal = KING_PST[piece.color === 'w' ? 7 - r : r][c];

        const totalVal = val + pstVal;
        if (piece.color === activeColor) {
          score += totalVal;
        } else {
          score -= totalVal;
        }
      }
    }
  }
  return score;
}

/**
 * Minimax with Alpha-Beta Pruning.
 * Depth 3 is fast enough for browser environments (under 200ms) and plays decent amateur chess.
 */
function minimax(
  chess: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  activeColor: string
): number {
  if (depth === 0 || chess.isGameOver()) {
    return evaluateBoard(chess.board(), activeColor);
  }

  const moves = chess.moves();
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, alpha, beta, false, activeColor);
      chess.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, alpha, beta, true, activeColor);
      chess.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

function getLocalBestMove(fen: string): string | null {
  const chess = new Chess(fen);
  const moves = chess.moves({ verbose: true });
  if (moves.length === 0) return null;

  const activeColor = chess.turn(); // 'w' or 'b'
  let bestMoveStr: string | null = null;
  let bestValue = -Infinity;

  // Shuffle moves slightly to avoid deterministic/robotic responses for identical evaluations
  const shuffledMoves = moves.sort(() => Math.random() - 0.5);

  for (const move of shuffledMoves) {
    chess.move(move.san);
    // Depth 3 search for smart plays
    const boardValue = minimax(chess, 2, -Infinity, Infinity, false, activeColor);
    chess.undo();

    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMoveStr = move.lan; // long algebraic notation: e2e4, g1f3 etc.
    }
  }

  return bestMoveStr;
}
