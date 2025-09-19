"use client";
import { CardGame } from "@/components/card-game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PLAYER_ICONS } from "@/shared/constants";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { LETTERS, packs } from "./constants";

export interface Player {
  id: string;
  name: string;
  color: string;
  score: number;
}

export interface GameData {
  category: string;
  letter: string;
}

// colors.ts
export const playerColors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-teal-400",
  "bg-orange-400",
  "bg-cyan-400",
  "bg-lime-400",
  "bg-emerald-400",
  "bg-violet-400",
  "bg-fuchsia-400",
  "bg-rose-400",
  "bg-sky-400",
];

const App: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState(Object.keys(packs)[0]);

  const [gameState, setGameState] = useState<"setup" | "playing" | "round">(
    "setup"
  );
  const [players, setPlayers] = useState<Player[]>(() => {
    const newPlayers: Player[] = [];
    for (let i = 0; i < 4; i++) {
      const playerId = `player-${i}`;
      newPlayers.push({
        id: playerId,
        name: `Игрок ${i + 1}`,
        color: playerColors[Math.floor(Math.random() * playerColors.length)],
        score: 0,
      });
    }

    return newPlayers;
  });

  const [currentRound, setCurrentRound] = useState<GameData | null>(null);
  const [winners, setWinners] = useState<string[]>([]);

  const startRound = () => {
    const target = packs[selectedPack];
    const randomCategory = target.filter((c) => c !== currentRound?.category)[
      Math.floor(Math.random() * target.length)
    ];

    const randomLetter = LETTERS.filter(
      (letter) => letter !== currentRound?.letter
    )[Math.floor(Math.random() * LETTERS.length)];

    setCurrentRound({ category: randomCategory, letter: randomLetter });
    setWinners([]);
    setGameState("round");
  };

  const toggleWinner = (playerId: string) => {
    setWinners((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const awardPoints = () => {
    setPlayers((prev) =>
      prev.map((player) =>
        winners.includes(player.id)
          ? { ...player, score: player.score + 1 }
          : player
      )
    );
    setGameState("playing");
  };

  const resetGame = () => {
    setGameState("setup");
    setCurrentRound(null);
    setWinners([]);
  };

  if (gameState === "setup") {
    return (
      <div className="grow p-4">
        <CardGame className="max-w-md mx-auto">
          <div className="space-y-4 mb-6">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center space-x-3">
                <div className={cn("text-2xl rounded-full", player.color)}>
                  {PLAYER_ICONS[index]}
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    value={player.name}
                    onChange={(e) =>
                      setPlayers((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, name: e.target.value } : p
                        )
                      )
                    }
                    placeholder={`Игрок ${index + 1}`}
                  />
                </div>
                <button
                  disabled={players.length <= 2}
                  onClick={() =>
                    setPlayers((prev) => prev.filter((p) => p.id !== player.id))
                  }
                  className="text-red-500 disabled:opacity-10 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <Select
              value={selectedPack}
              items={Object.keys(packs)}
              onChangeValue={(v) => setSelectedPack(v)}
              label="Выберите набор слов:"
            />
          </div>

          <Button
            className="mb-2 py-6"
            variant={"outline"}
            disabled={players.length >= 16}
            onClick={() => {
              const newPlayerId = `player-${players.length}`;
              const newPlayer: Player = {
                id: newPlayerId,
                name: `Игрок ${players.length + 1}`,
                color:
                  playerColors[Math.floor(Math.random() * playerColors.length)],
                score: 0,
              };
              setPlayers((prev) => [...prev, newPlayer]);
            }}
          >
            Добавить игрока
          </Button>

          <Button
            className="py-6"
            onClick={() => {
              setGameState("playing");
            }}
            disabled={Object.values(players).some(({ name }) => !name.trim())}
          >
            Начать игру
          </Button>
        </CardGame>
      </div>
    );
  }

  const Header = () => {
    return (
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={resetGame}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Сброс
        </button>
      </div>
    );
  };

  if (gameState === "round" && currentRound) {
    return (
      <div className="grow p-4">
        <CardGame className="max-w-md mx-auto">
          <Header />
          <div className="space-y-3 mb-6">
            {players.map((player, index) => (
              <button
                key={player.id}
                onClick={() => toggleWinner(player.id)}
                className={`w-full p-4 rounded-xl text-left transition-all min-h-16 ${
                  winners.includes(player.id)
                    ? `${player.color} text-white shadow-lg scale-[1.02]`
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl"> {PLAYER_ICONS[index]}</span>
                    <span
                      className={`font-medium ${
                        winners.includes(player.id)
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {player.name}
                    </span>
                  </div>
                  {winners.includes(player.id) && (
                    <span className="text-xl">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={awardPoints}
            className={`py-6 ${
              winners.length > 0
                ? ""
                : "bg-gray-300 text-gray-500 hover:text-white"
            }`}
          >
            {winners.length > 0
              ? `Начислить ${winners.length} очков`
              : "Выберите победителей"}
          </Button>

          <div className="text-center py-6">
            <span className="inline-block bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full mb-3 font-medium">
              Тема
            </span>
            <p className="text-lg font-medium text-gray-800 leading-tight">
              {currentRound.category}
            </p>
          </div>

          <div className="text-center">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-3 font-medium">
              Буква
            </span>
            <div className="text-7xl font-bold text-blue-600 mb-2">
              {currentRound.letter}
            </div>
          </div>
        </CardGame>
      </div>
    );
  }

  return (
    <div className="grow p-4">
      <CardGame className="max-w-md mx-auto">
        <Header />
        <div className="space-y-3 mb-6">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`${player.color} p-4 rounded-xl text-white shadow-sm min-h-16`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{PLAYER_ICONS[index]}</span>
                  <div className="font-medium">{player.name}</div>
                </div>
                <div className="text-2xl font-bold">{player.score}</div>
              </div>
            </div>
          ))}
        </div>

        <Button className="py-6" onClick={startRound}>
          🎲 Новый раунд
        </Button>
      </CardGame>
    </div>
  );
};

export default App;
