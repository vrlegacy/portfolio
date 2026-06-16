"use client"

import React, { useEffect, useState, useRef } from "react";
import { Chess } from "chess.js";
import dynamic from "next/dynamic";
import { getBestMove } from "../utils/stockfish";

const Chessboard = dynamic(
  () => import("react-chessboard").then((mod) => mod.Chessboard),
  { ssr: false }
) as any;
import { 
  RotateCcw, 
  Flag, 
  Undo2, 
  HelpCircle, 
  User, 
  Monitor, 
  Send,
  MessageSquare,
  History,
  Mail,
  Volume2,
  VolumeX,
  Palette
} from "lucide-react";

interface ChatMessage {
  sender: "bot" | "user" | "system";
  text: string;
  timestamp: string;
}

export default function ChessBoard() {
  const [game, setGame] = useState(() => new Chess());
  const [fen, setFen] = useState<string>("start");
  const [boardTheme, setBoardTheme] = useState<"classic" | "red-yellow">("classic");
  
  // Randomize bot difficulty rating on start
  const [botRating, setBotRating] = useState<number>(() => Math.floor(Math.random() * 600) + 1200); // 1200 - 1800
  const [skillLevel, setSkillLevel] = useState<number>(() => Math.floor(Math.random() * 20)); // 0 - 20
  
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "moves">("chat");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameOverReason, setGameOverReason] = useState<string | null>(null);
  
  // Lobby Setup States
  const [gameStarted, setGameStarted] = useState(false);
  const [playerSide, setPlayerSide] = useState<"w" | "b">("w");
  const [timeControl, setTimeControl] = useState<number>(600); // Default 10 mins (600 seconds)

  // Clocks
  const [whiteTime, setWhiteTime] = useState(600); // 10 minutes in seconds
  const [blackTime, setBlackTime] = useState(600);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Chat
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Move history
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  // Option squares for highlighting moves
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});
  const [moveFrom, setMoveFrom] = useState<string | null>(null);

  // Sound effects (using browser speech synthesis or local audio context for clean click noise)
  const playMoveSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Audio context might be blocked by browser policy
    }
  };

  // Initialize bot greeting
  useEffect(() => {
    setChatMessages([
      {
        sender: "bot",
        text: `🤖 Hi! I am a Vintage Chess Bot. My current rating is estimated at ${botRating}. Let's play!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        sender: "system",
        text: "Interested in playing? Send a mail to vishwasrudrmaurthy.26@gmail.com",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [botRating]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Sync board FEN and move history
  useEffect(() => {
    setFen(game.fen());
    setMoveHistory(game.history());
    
    // Play move sound
    if (game.history().length > 0) {
      playMoveSound();
    }

    // Check game over
    if (game.isGameOver()) {
      let reason = "Game Over";
      if (game.isCheckmate()) {
        reason = "Checkmate!";
        const winner = game.turn() === "w" ? "Black (Bot)" : "White (You)";
        addBotMessage(game.turn() === "w" ? "Checkmate! Well played. 🤝" : "Incredible! You beat me! 🏆");
        setGameOverReason(`${reason} - ${winner} wins`);
      } else if (game.isDraw()) {
        reason = "Draw";
        addBotMessage("It's a draw! Good match. 🤝");
        setGameOverReason(`${reason} - Agreement or Stalemate`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  // Chess clock timer loop
  useEffect(() => {
    if (!gameStarted || game.isGameOver()) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (game.turn() === "w") {
        setWhiteTime((t) => {
          if (t <= 1) {
            setGameOverReason(playerSide === "w" ? "Time out! Black (Bot) wins" : "Time out! White (You) wins");
            addBotMessage(playerSide === "w" ? "You ran out of time! Good game." : "I ran out of time! Congratulations! 🎉");
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return t - 1;
        });
      } else {
        setBlackTime((t) => {
          if (t <= 1) {
            setGameOverReason(playerSide === "w" ? "Time out! White (You) wins" : "Time out! Black (Bot) wins");
            addBotMessage(playerSide === "w" ? "I ran out of time! Congratulations! 🎉" : "You ran out of time! Good game.");
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return t - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [game, gameStarted, playerSide]);

  // Bot move trigger
  useEffect(() => {
    if (!gameStarted || game.isGameOver()) return;

    const botIsActive = game.turn() !== playerSide;
    if (botIsActive) {
      setIsBotThinking(true);
      const thinkingTime = Math.random() * 800 + 400; // Realistic delay (400ms - 1200ms)
      
      const timer = setTimeout(async () => {
        const move = await getBestMove(game.fen(), skillLevel);
        if (move) {
          try {
            game.move(move);
            setGame(new Chess(game.fen()));
            
            // Random bot dialogue occasionally
            if (Math.random() < 0.25) {
              const dialogues = [
                "Your move! Let's see what you do next.",
                "Ah, an interesting position.",
                "I must think carefully about this one.",
                "Nicely played.",
                "Let's see if you spotted my plan."
              ];
              addBotMessage(dialogues[Math.floor(Math.random() * dialogues.length)]);
            }
          } catch (e) {
            // If move parse failed, make first legal move as fallback
            const legalMoves = game.moves();
            if (legalMoves.length > 0) {
              game.move(legalMoves[0]);
              setGame(new Chess(game.fen()));
            }
          }
        }
        setIsBotThinking(false);
      }, thinkingTime);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen, gameStarted, playerSide]);

  const addBotMessage = (text: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handlePlayerMove = (sourceSquare: string, targetSquare: string) => {
    if (game.turn() !== playerSide || game.isGameOver()) return false;
    
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // auto promote to queen for simplicity
      });

      if (move === null) return false;
      setGame(new Chess(game.fen()));
      setMoveFrom(null);
      setOptionSquares({});
      return true;
    } catch (error) {
      return false;
    }
  };

  const onSquareClick = (square: string) => {
    if (game.turn() !== playerSide || game.isGameOver()) return;

    // Try to execute a move from selected square to clicked square
    if (moveFrom) {
      const moves = game.moves({ square: moveFrom as any, verbose: true });
      const foundMove = moves.find((m) => m.to === square);

      if (foundMove) {
        try {
          game.move({
            from: moveFrom,
            to: square,
            promotion: "q",
          });
          setGame(new Chess(game.fen()));
          setMoveFrom(null);
          setOptionSquares({});
          return;
        } catch (e) {
          // Ignore
        }
      }
    }

    // Otherwise, select the clicked piece (if it belongs to the player)
    const piece = game.get(square as any);
    if (piece && piece.color === playerSide) {
      const moves = game.moves({ square: square as any, verbose: true });
      const newSquares: Record<string, React.CSSProperties> = {};

      // Highlight the selected square in Chess.com yellow
      newSquares[square] = {
        background: "rgba(247, 247, 105, 0.4)",
      };

      // Highlight each destination square
      moves.forEach((m) => {
        const isCapture = game.get(m.to) !== null;
        newSquares[m.to] = {
          background: isCapture
            ? "radial-gradient(circle, transparent 60%, rgba(0,0,0,.18) 60%, rgba(0,0,0,.18) 70%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,0,0,.18) 18%, transparent 18%)",
        };
      });

      setMoveFrom(square);
      setOptionSquares(newSquares);
    } else {
      setMoveFrom(null);
      setOptionSquares({});
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const startPlaying = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen("start");
    setWhiteTime(timeControl);
    setBlackTime(timeControl);
    setGameOverReason(null);
    setOptionSquares({});
    setMoveFrom(null);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false); // Return to lobby setup screen
    const newGame = new Chess();
    setGame(newGame);
    setFen("start");
    setWhiteTime(timeControl);
    setBlackTime(timeControl);
    setGameOverReason(null);
    setOptionSquares({});
    setMoveFrom(null);
    const newRating = Math.floor(Math.random() * 600) + 1200;
    setBotRating(newRating);
    setSkillLevel(Math.floor(Math.random() * 20));
    setChatMessages([
      {
        sender: "bot",
        text: `🤖 New game started! I am playing as Vintage Bot with rating ${newRating}. Good luck!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        sender: "system",
        text: "Interested in playing? Send a mail to vishwasrudrmaurthy.26@gmail.com",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const undoMove = () => {
    // Undo player move + bot move
    if (game.history().length >= 2) {
      game.undo();
      game.undo();
      setGame(new Chess(game.fen()));
      addBotMessage("Moves undone. Let's continue!");
    }
  };

  const resignGame = () => {
    if (game.isGameOver()) return;
    setGameOverReason(playerSide === "w" ? "Resigned - Black (Bot) wins" : "Resigned - White (Bot) wins");
    addBotMessage("Good game! Thanks for playing.");
  };

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatInput("");

    // Simulate bot replying to user chat
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "I am focusing on the board, but I enjoy chatting! ♟️";
      if (lower.includes("hello") || lower.includes("hi")) {
        reply = "Hello! Hope you are enjoying the match.";
      } else if (lower.includes("hard") || lower.includes("difficult")) {
        reply = "I'm doing my best! Check the mail in the chat if you'd like to get in touch.";
      } else if (lower.includes("email") || lower.includes("contact") || lower.includes("mail")) {
        reply = "Yes, you can email Vishwas at vishwasrudrmaurthy.26@gmail.com!";
      }
      addBotMessage(reply);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full max-w-5xl mx-auto px-4 py-6 bg-[#161513] text-[#e0e0e0] font-sans rounded-xl shadow-2xl font-sans">
      {/* Chess Board Area / Lobby Setup Card */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-[500px] mx-auto w-full min-h-[500px]">
        {!gameStarted ? (
          <div className="w-full bg-[#21201d] border border-neutral-800 rounded-xl p-8 flex flex-col justify-between h-full shadow-2xl">
            <div>
              <h2 className="text-2xl font-bold text-white text-center mb-6">Game Settings</h2>
              
              {/* Choose Side */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-neutral-400 mb-3">PLAY AS</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPlayerSide("w")}
                    className={`py-4 rounded-xl border flex flex-col items-center gap-2 transition duration-200 cursor-pointer ${
                      playerSide === "w"
                        ? "border-primary bg-primary/10 text-white font-semibold"
                        : "border-neutral-800 bg-[#1a1917] text-neutral-400 hover:border-neutral-700 hover:text-white"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white border border-neutral-300" />
                    White
                  </button>
                  <button
                    onClick={() => setPlayerSide("b")}
                    className={`py-4 rounded-xl border flex flex-col items-center gap-2 transition duration-200 cursor-pointer ${
                      playerSide === "b"
                        ? "border-primary bg-primary/10 text-white font-semibold"
                        : "border-neutral-800 bg-[#1a1917] text-neutral-400 hover:border-neutral-700 hover:text-white"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-black border border-neutral-800" />
                    Black
                  </button>
                </div>
              </div>

              {/* Choose Time Control */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-neutral-400 mb-3">TIME CONTROL</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "5 Mins", value: 300 },
                    { label: "10 Mins", value: 600 },
                    { label: "30 Mins", value: 1800 },
                  ].map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTimeControl(t.value)}
                      className={`py-3 rounded-lg border text-sm transition duration-200 cursor-pointer ${
                        timeControl === t.value
                          ? "border-primary bg-primary/10 text-white font-semibold"
                          : "border-neutral-800 bg-[#1a1917] text-neutral-400 hover:border-neutral-700 hover:text-white"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={startPlaying}
              className="w-full py-4 bg-primary hover:bg-primary/95 text-primary-foreground text-lg font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Play Now
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between w-full h-full">
            {/* Opponent Card */}
            <div className={`flex items-center justify-between p-3 mb-2 rounded-lg bg-[#21201d] border border-neutral-800 ${game.turn() !== playerSide && !game.isGameOver() ? "ring-2 ring-primary" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#2d2b28] flex items-center justify-center border border-neutral-700">
                  <Monitor className="text-primary w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-sm flex items-center gap-2">
                    Vintage Bot
                    <span className="text-xs bg-[#2d2b28] px-1.5 py-0.5 rounded text-neutral-400 font-mono">
                      {botRating}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400">
                    {isBotThinking ? "Thinking..." : "Idle"}
                  </div>
                </div>
              </div>
              <div className="font-mono text-xl font-bold bg-[#161513] px-3 py-1.5 rounded border border-neutral-800 text-neutral-100 min-w-[70px] text-center">
                {formatTime(playerSide === "w" ? blackTime : whiteTime)}
              </div>
            </div>

            {/* Board Container */}
            <div className="relative aspect-square w-full rounded-md overflow-hidden shadow-lg border border-neutral-800 bg-[#262421]">
              <Chessboard
                position={fen}
                onPieceDrop={handlePlayerMove}
                onSquareClick={onSquareClick}
                customSquareStyles={optionSquares}
                boardWidth={500}
                boardOrientation={playerSide === "w" ? "white" : "black"}
                arePiecesDraggable={game.turn() === playerSide && !game.isGameOver()}
                customDarkSquareStyle={{ backgroundColor: boardTheme === "classic" ? "#769656" : "#b62b2b" }}
                customLightSquareStyle={{ backgroundColor: boardTheme === "classic" ? "#eeeed2" : "#f3ca40" }}
                customBoardStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
              />

              {gameOverReason && (
                <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center z-10 p-6 text-center animate-fade-in">
                  <div className="bg-[#262421] p-8 rounded-xl border border-neutral-700 shadow-2xl max-w-sm">
                    <h2 className="text-2xl font-bold text-primary mb-2">Game Over</h2>
                    <p className="text-sm text-neutral-300 mb-6 font-medium">{gameOverReason}</p>
                    <button
                      onClick={resetGame}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition shadow-lg cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> Play Again
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Player Card */}
            <div className={`flex items-center justify-between p-3 mt-2 rounded-lg bg-[#21201d] border border-neutral-800 ${game.turn() === playerSide && !game.isGameOver() ? "ring-2 ring-primary" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#2d2b28] flex items-center justify-center border border-neutral-700">
                  <User className="text-neutral-400 w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-sm">You</div>
                  <div className="text-xs text-neutral-400">
                    {playerSide === "w" ? "White" : "Black"}
                  </div>
                </div>
              </div>
              <div className="font-mono text-xl font-bold bg-[#161513] px-3 py-1.5 rounded border border-neutral-800 text-neutral-100 min-w-[70px] text-center">
                {formatTime(playerSide === "w" ? whiteTime : blackTime)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chess.com Sidebar / Panel */}
      <div className="w-full lg:w-[360px] flex flex-col justify-between bg-[#21201d] rounded-xl border border-neutral-800 overflow-hidden shadow-lg">
        {/* Sidebar Header Tabs */}
        <div className="flex border-b border-neutral-800 bg-[#1a1917]">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === "chat"
                ? "border-primary text-primary bg-[#21201d]"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Sidechat
          </button>
          <button
            onClick={() => setActiveTab("moves")}
            className={`flex-1 py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === "moves"
                ? "border-primary text-primary bg-[#21201d]"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <History className="w-4 h-4" /> Moves
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[380px] bg-[#21201d]">
          {activeTab === "chat" ? (
            <div className="flex flex-col gap-3 h-full justify-between">
              {/* Chat Log */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 scrollbar-thin">
                {chatMessages.map((msg, index) => {
                  if (msg.sender === "system") {
                    return (
                      <div 
                        key={index} 
                        className="bg-[#2d2716]/60 border border-[#b8860b]/40 rounded-lg p-3 my-1 flex items-start gap-2.5 text-xs text-[#d4af37]"
                      >
                        <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold mb-1">Play Request</p>
                          <p className="leading-relaxed">
                            Interested in playing? Send a mail to{" "}
                            <a 
                              href="mailto:vishwasrudrmaurthy.26@gmail.com" 
                              className="underline font-bold hover:text-white"
                            >
                              vishwasrudrmaurthy.26@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div
                      key={index}
                      className={`flex flex-col max-w-[85%] rounded-lg p-2.5 text-xs leading-normal ${
                        msg.sender === "bot"
                          ? "self-start bg-[#2a2926] text-neutral-200 rounded-bl-none border border-neutral-800"
                          : "self-end bg-primary/20 text-primary-foreground rounded-br-none border border-primary/30"
                      }`}
                    >
                      <p className="font-semibold text-[10px] text-neutral-500 mb-0.5">
                        {msg.sender === "bot" ? "Vintage Bot" : "You"}
                      </p>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={sendChatMessage} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask the bot or type message..."
                  className="flex-1 text-xs bg-[#161513] border border-neutral-800 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-primary/50"
                />
                <button
                  type="submit"
                  className="p-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg border border-primary/30 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          ) : (
            /* Move History List */
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-3 text-xs font-semibold text-neutral-500 border-b border-neutral-800 pb-2 mb-2">
                <div>Move</div>
                <div>White</div>
                <div>Black</div>
              </div>
              <div className="flex-1 overflow-y-auto pr-1">
                {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                  <div key={i} className="grid grid-cols-3 text-xs py-1.5 border-b border-neutral-800/40 text-neutral-300 font-mono">
                    <div className="text-neutral-500 font-bold">{i + 1}.</div>
                    <div>{moveHistory[i * 2]}</div>
                    <div>{moveHistory[i * 2 + 1] || "..."}</div>
                  </div>
                ))}
                {moveHistory.length === 0 && (
                  <div className="text-neutral-500 text-xs text-center mt-8 italic">
                    No moves played yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Controls Footer */}
        <div className="p-4 bg-[#1a1917] border-t border-neutral-800 flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={resetGame}
              title="New Game"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#2a2926] hover:bg-[#363430] border border-neutral-700 text-xs font-medium rounded-lg text-neutral-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> New Game
            </button>
            <button
              onClick={undoMove}
              disabled={game.history().length < 2 || game.isGameOver()}
              title="Undo Move"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#2a2926] hover:bg-[#363430] border border-neutral-700 text-xs font-medium rounded-lg text-neutral-200 transition disabled:opacity-40 disabled:hover:bg-[#2a2926]"
            >
              <Undo2 className="w-3.5 h-3.5" /> Takeback
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resignGame}
              disabled={game.isGameOver()}
              title="Resign"
              className="flex-1 flex items-center justify-center gap-1 py-2 px-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-xs font-medium rounded-lg text-red-400 transition disabled:opacity-40"
            >
              <Flag className="w-3 h-3" /> Resign
            </button>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
              className="flex-1 flex items-center justify-center gap-1 py-2 px-2 bg-[#2a2926] hover:bg-[#363430] border border-neutral-700 text-xs font-medium rounded-lg text-neutral-200 transition"
            >
              {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />} Sounds
            </button>
            <button
              onClick={() => setBoardTheme((t) => (t === "classic" ? "red-yellow" : "classic"))}
              title="Toggle board theme"
              className="flex-1 flex items-center justify-center gap-1 py-2 px-2 bg-[#2a2926] hover:bg-[#363430] border border-neutral-700 text-xs font-medium rounded-lg text-neutral-200 transition"
            >
              <Palette className="w-3 h-3 text-[#f3ca40]" /> Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
