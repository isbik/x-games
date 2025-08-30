"use client";

import { CardGame } from "@/components/card-game";
import { Button } from "@/components/ui/button";
import { cn, shuffle } from "@/lib/utils";
import { ANIMALS } from "@/shared/constants/animals";
import { LOCATIONS } from "@/shared/constants/locations";
import { useEndTimer } from "@/shared/hooks/use-end-timer";
import {
  Eye,
  MinusCircle,
  PlayCircle,
  PlusCircle,
  Shuffle,
  Timer,
  Users,
  Vote,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [playerCount, setPlayerCount] = useState(3);

  const [players, setPlayers] = useState<string[]>([]);

  const [showedRoles, setShowedRoles] = useState<string[]>([]);

  const [showPlayerRole, setShowPlayerRole] = useState<string | null>(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [isShowAll, setIsShowAll] = useState(false);

  useEndTimer(timeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning && timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const [gameData, setGameData] = useState<{
    location: string;
    spyPlayer: number;
  } | null>(null);

  const handleStartGame = () => {
    const randomLocation =
      LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const spyPlayer = Math.floor(Math.random() * playerCount) + 1;

    setGameData({
      location: randomLocation,
      spyPlayer: spyPlayer,
    });
    setGameStarted(true);
    setTimeLeft(120);
    setIsShowAll(false);

    setPlayers(shuffle(ANIMALS).slice(0, playerCount));

    setShowedRoles([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAction = () => {
    if (isShowAll) {
      handleStartGame();
      return;
    }

    if (isTimerRunning) {
      setIsShowAll(true);
      setIsTimerRunning(false);
      return;
    }

    setIsTimerRunning(true);
  };

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleShowRole = (player: string) => {
    const isViewed = showedRoles.includes(player);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (showPlayerRole === player) {
      setShowPlayerRole(null);
      return;
    }

    if (isViewed) return;

    setShowPlayerRole(player);

    setShowedRoles((prev) => {
      return [...prev, player];
    });

    timerRef.current = setTimeout(() => {
      setShowPlayerRole(null);
    }, 1000);
  };

  return (
    <div className="overflow-auto ">
      <CardGame className="gap-4 m-4 max-w-md mx-auto w-full rounded-xl pt-6">
        {!gameStarted ? (
          <>
            <div className="bg-blue-100 rounded-xl p-4 space-y-4">
              <p className="text-lg">Правила игры:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Каждому игроку будет показана его роль</li>
                <li>Один из игроков будет шпионом</li>
                <li>Остальные узнают локацию</li>
                <li>Задавайте вопросы и найдите шпиона!</li>
              </ul>
            </div>

            <div className="flex items-center justify-center space-x-4 my-4">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="flex items-center space-x-4">
                <button
                  disabled={playerCount <= 3}
                  onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                  className="bg-blue-100 hover:bg-blue-200 rounded-full p-2 disabled:opacity-50"
                >
                  <MinusCircle className="w-6 h-6 text-blue-600" />
                </button>
                <span className="text-2xl font-bold text-blue-600 tabular-nums">
                  {playerCount}
                </span>
                <button
                  disabled={playerCount >= ANIMALS.length}
                  onClick={() => setPlayerCount(playerCount + 1)}
                  className="bg-blue-100 hover:bg-blue-200 rounded-full p-2 disabled:opacity-50"
                >
                  <PlusCircle className="w-6 h-6 text-blue-600" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleStartGame}
              className="w-full py-8 text-xl mt-auto"
            >
              <PlayCircle className="w-6 h-6" />
              <span>Начать игру!</span>
            </Button>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center space-x-4">
              <Timer className="w-8 h-8 text-blue-500" />
              <span className="text-4xl font-bold text-blue-600">
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="bg-gray-500/20 h-[1px] -mx-4"></div>
            <div className="bg-blue-50 p-4 space-y-4 -m-4  grow">
              <div className="flex flex-col items-center space-y-2 overflow-auto">
                {players.map((player, index) => {
                  const isSpy = index + 1 === gameData?.spyPlayer;
                  const isViewed =
                    showedRoles.includes(player) && showPlayerRole !== player;

                  return (
                    <React.Fragment key={player}>
                      <button
                        onClick={() => {
                          handleShowRole(player);
                        }}
                        className={cn(
                          "border-blue-600 bg-white border-2 hover:bg-blue-50 text-blue-600 font-bold py-3 px-6 rounded-xl w-full flex items-center space-x-2",
                          isViewed && "border-black/10 bg-black/5"
                        )}
                      >
                        <span className="mr-auto text-lg">{player}</span>

                        {!showedRoles.includes(player) && !isShowAll && (
                          <>
                            <Eye className="size-5" />
                            <span>Показать роль</span>
                          </>
                        )}

                        {(showPlayerRole === player || isShowAll) && (
                          <div
                            className={`text-lg font-bold ${
                              isSpy ? "text-red-500" : "text-green-600"
                            }`}
                          >
                            {isSpy ? "Вы шпион!" : gameData?.location}
                          </div>
                        )}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <div className="bg-gray-500/20 h-[1px] -mx-4"></div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setGameStarted(false);
                  setGameData(null);
                  setShowPlayerRole(null);
                  setIsTimerRunning(false);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-colors whitespace-nowrap"
              >
                <Shuffle className="w-6 h-6" />
                <span>Новая игра</span>
              </button>
              <button
                onClick={handleAction}
                className={cn(
                  "flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                )}
              >
                <Vote className="w-6 h-6" />
                <span>{isTimerRunning ? "Завершить" : "Начать"}</span>
              </button>
            </div>
          </>
        )}
      </CardGame>
    </div>
  );
}

export default App;
