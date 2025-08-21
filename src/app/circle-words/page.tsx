"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Check, RotateCw, Settings, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LETTER_MODES, LETTER_SETS, themes } from "./constants";

type GameState = "settings" | "playing" | "roundEnd" | "spinning";

export default function WordFlashGame() {
  const [timerDuration, setTimerDuration] = useState<number>(5);
  const [allowRepeats, setAllowRepeats] = useState<boolean>(false);
  const [letterMode, setLetterMode] =
    useState<keyof typeof LETTER_MODES>("COMMON");

  const [gameState, setGameState] = useState<GameState>("settings");
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinRotation, setSpinRotation] = useState<number>(0);
  const [highlightedLetters, setHighlightedLetters] = useState<string[]>([]);

  const getRandomTheme = useCallback(() => {
    return themes[Math.floor(Math.random() * themes.length)];
  }, []);

  const getRandomLetter = useCallback(() => {
    let availableLetters = LETTER_SETS[letterMode];

    if (!allowRepeats && usedLetters.length > 0) {
      availableLetters = availableLetters
        .split("")
        .filter((l) => !usedLetters.includes(l))
        .join("");

      if (availableLetters.length === 0) {
        setUsedLetters([]);
        availableLetters = LETTER_SETS[letterMode];
      }
    }

    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    return availableLetters[randomIndex];
  }, [letterMode, allowRepeats, usedLetters]);

  const startRound = useCallback(() => {
    setGameState("spinning");
    setIsSpinning(true);

    const highlightInterval = setInterval(() => {
      const freeLetter = getRandomLetter();
      setHighlightedLetters([freeLetter]);
    }, 200);

    const baseRotation = (Math.floor(Math.random() * 3) + 3) * 360;
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = spinRotation + baseRotation + randomAngle;

    setSpinRotation(totalRotation);

    setTimeout(() => {
      clearInterval(highlightInterval);
      setHighlightedLetters([]);

      const newLetter = getRandomLetter();

      setCurrentLetter(highlightedLetters[0] || newLetter);
      setTimeLeft(timerDuration);
      setUsedLetters((prev) => [...prev, newLetter]);
      setIsSpinning(false);
      setGameState("playing");
    }, 2000);
  }, [
    getRandomLetter,
    getRandomTheme,
    timerDuration,
    spinRotation,
    letterMode,
  ]);

  // Timer effect
  useEffect(() => {
    if (gameState !== "playing" || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  // Handle time running out
  useEffect(() => {
    if (timeLeft === 0 && gameState === "playing") {
      setGameState("roundEnd");
    }
  }, [timeLeft, gameState]);

  const handleCorrect = () => {
    setScore((prev) => prev + 1);
    startRound();
  };

  // Start game
  const startGame = () => {
    setScore(0);
    setUsedLetters([]);
    setSpinRotation(0);
    startRound();
    setTheme(getRandomTheme());
  };

  const renderLetterWheel = () => {
    const letters = LETTER_SETS[letterMode].split("");
    const segmentAngle = 360 / letters.length;
    const centerX = 160;
    const centerY = 160;

    return (
      <div className="relative w-80 h-80 mx-auto">
        <div className="w-full h-full rounded-full bg-white shadow-lg relative border-4 border-gray-200">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
            {letters.map((letter, index) => {
              const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
              const endAngle =
                ((index + 1) * segmentAngle - 90) * (Math.PI / 180);

              const x1 = 160 + 140 * Math.cos(startAngle);
              const y1 = 160 + 140 * Math.sin(startAngle);
              const x2 = 160 + 140 * Math.cos(endAngle);
              const y2 = 160 + 140 * Math.sin(endAngle);

              const largeArcFlag = segmentAngle > 180 ? 1 : 0;

              const pathData = [
                `M 160 160`,
                `L ${x1} ${y1}`,
                `A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                "Z",
              ].join(" ");

              const isCurrentLetter = letter === currentLetter && !isSpinning;
              const isUsedLetter =
                usedLetters.includes(letter) && !allowRepeats;
              const isHighlighted = highlightedLetters.includes(letter);

              return (
                <g key={`segment-${letter}-${index}`}>
                  <path
                    d={pathData}
                    fill={
                      isCurrentLetter
                        ? "url(#currentGradient)"
                        : isHighlighted
                        ? "#fef08a" // Highlight color
                        : isUsedLetter
                        ? "#f3f4f6"
                        : index % 2 === 0
                        ? "#dbeafe"
                        : "#e0e7ff"
                    }
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  ></path>
                </g>
              );
            })}

            <defs>
              <linearGradient
                id="currentGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0">
            {letters.map((letter, index) => {
              const segmentCenterAngle =
                (index * segmentAngle + segmentAngle / 2) * (Math.PI / 180);
              const letterRadius = 120;
              const x =
                centerX +
                letterRadius * Math.cos(segmentCenterAngle - Math.PI / 2);
              const y =
                centerY +
                letterRadius * Math.sin(segmentCenterAngle - Math.PI / 2);

              const isCurrentLetter = letter === currentLetter && !isSpinning;
              const isUsedLetter =
                usedLetters.includes(letter) && !allowRepeats;
              const isHighlighted = highlightedLetters.includes(letter);

              return (
                <div
                  key={`letter-${letter}-${index}`}
                  className={`absolute w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${
                    isCurrentLetter
                      ? "text-white bg-amber-500 shadow-lg"
                      : isHighlighted
                      ? "text-black bg-yellow-300 shadow-md" // Highlight style
                      : isUsedLetter
                      ? "text-gray-400"
                      : "text-blue-800"
                  }`}
                  style={{
                    left: x - 16,
                    top: y - 16,
                    transform: "translate(0, 0)",
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {gameState === "spinning" ? (
              <></>
            ) : (
              <>
                <div
                  className={`text-6xl font-bold mb-2 ${
                    timeLeft <= 3
                      ? "text-red-500 animate-pulse"
                      : "text-blue-600"
                  }`}
                >
                  {currentLetter}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {timeLeft}с
                </div>
              </>
            )}
          </div>
        </div>

        {gameState === "playing" && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="4"
              opacity="0.3"
            />
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray="942"
              strokeDashoffset={942 - (942 * timeLeft) / timerDuration}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className="grow flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {gameState === "settings" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              🎰 Колесо букв
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Длительность таймера: {timerDuration}с
                </label>
                <Slider
                  value={[timerDuration]}
                  onValueChange={(val) => setTimerDuration(val[0])}
                  min={2}
                  max={10}
                  step={1}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Разрешить повтор букв
                </label>
                <Switch
                  checked={allowRepeats}
                  onCheckedChange={setAllowRepeats}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Режим букв
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(LETTER_MODES).map(([key, value]) => (
                    <Button
                      key={key}
                      variant={letterMode === key ? "default" : "outline"}
                      onClick={() =>
                        setLetterMode(key as keyof typeof LETTER_MODES)
                      }
                      className="h-10"
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={startGame}
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              🎮 Начать игру
            </Button>
          </div>
        )}

        {(gameState === "playing" ||
          gameState === "roundEnd" ||
          gameState === "spinning") && (
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGameState("settings")}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <div className="text-xl font-bold">🏆 Счет: {score}</div>
            </div>

            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">Тема</div>
              <div className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                {theme || <span>&nbsp;</span>}
              </div>
            </div>

            {renderLetterWheel()}

            <div className="flex justify-center gap-4">
              {gameState === "roundEnd" ? (
                <Button
                  onClick={startRound}
                  className="py-6 text-lg font-bold flex gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <RotateCw className="h-5 w-5" /> 🎰 Следующий раунд
                </Button>
              ) : (
                <>
                  <Button
                    disabled={gameState === "spinning"}
                    variant="destructive"
                    onClick={() => setGameState("roundEnd")}
                    className="py-6 text-lg font-bold flex gap-2"
                  >
                    <X className="h-5 w-5" /> Пропустить
                  </Button>
                  <Button
                    disabled={gameState === "spinning"}
                    onClick={handleCorrect}
                    className="py-6 text-lg font-bold flex gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Check className="h-5 w-5" /> ✨ Угадал!
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
