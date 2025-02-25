"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  PlayIcon,
  PauseIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";
import type { Team, GameSettings } from "@/app/alias/page";
import { cn, shuffle } from "@/lib/utils";
import { useWordPacks } from "@/shared/hooks/use-word-packs";
import { useEndTimer } from "@/shared/hooks/use-end-timer";

export function GameQueue({
  currentTeam,
  settings,
  onStart,
}: {
  teams: Team[];
  currentTeam: Team;
  settings: GameSettings;
  onStart: (words: Array<{ word: string; correct: boolean }>) => void;
}) {
  const packs = useWordPacks();
  const words = shuffle(
    settings.selectedPacks.flatMap(
      (packName) => packs.find((p) => p.name === packName)?.words || []
    )
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.playTime);
  const [currentWords, setCurrentWords] = useState<
    Array<{ word: string; correct: boolean }>
  >([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  useEndTimer(timeLeft);

  useEffect(() => {
    if (isPlaying && !isPaused && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, isPaused, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setTimeLeft(settings.playTime);
    setCurrentWordIndex(0);
    setCurrentWords([{ word: words[0], correct: false }]);
  };

  const togglePause = () => setIsPaused(!isPaused);

  const handleWordResult = (correct: boolean) => {
    setSwipeDirection(correct ? "right" : "left");

    setTimeout(() => {
      setCurrentWords((prev) => {
        const newArray = [...prev];
        newArray[currentWordIndex].correct = correct;
        return newArray;
      });

      if (timeLeft === 0) {
        setIsPlaying(false);
        onStart(currentWords);
        return;
      }

      const nextWord = words[(currentWordIndex + 1) % words.length];
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentWords((prev) => [...prev, { word: nextWord, correct: false }]);
      setSwipeDirection(null);
    }, 500);
  };

  return (
    <>
      <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 border-b border-primary/10">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-3xl rounded-full size-12 flex items-center justify-center font-bold",
                currentTeam.color
              )}
            >
              {currentTeam.emoji}
            </span>
            <div className="space-y-1">
              <span className="block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-text">
                {currentTeam.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-3xl font-mono font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
            {isPlaying && (
              <Button
                size="icon"
                className="text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={togglePause}
              >
                {isPaused ? (
                  <PlayIcon className="h-6 w-6" />
                ) : (
                  <PauseIcon className="h-6 w-6" />
                )}
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      {isPlaying ? (
        <motion.div
          key={currentWords[currentWordIndex]?.word}
          initial={{ x: 0, opacity: 1, rotate: 0 }}
          animate={{
            x:
              swipeDirection === "left"
                ? -400
                : swipeDirection === "right"
                ? 400
                : 0,
            opacity: swipeDirection ? 0 : 1,
            rotate: swipeDirection ? (swipeDirection === "left" ? -45 : 45) : 0,
            backgroundColor: swipeDirection
              ? swipeDirection === "left"
                ? "rgba(239, 68, 68, 0.2)"
                : "rgba(34, 197, 94, 0.2)"
              : "transparent",
          }}
          transition={{ duration: 0.5 }}
          className="m-4 relative max-h-[250px] max-w-[600px] grow flex flex-col items-center justify-center p-8 rounded-xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-primary/20 self-center justify-self-end my-auto"
        >
          <div className="text-5xl font-bold text-center mb-8">
            {currentWords[currentWordIndex]?.word}
          </div>
          <div className="flex gap-4">
            <Button
              size="icon"
              variant="outline"
              className="border-red-500/30 hover:border-red-500/50 size-20 text-red-500"
              onClick={() => handleWordResult(false)}
            >
              <XCircleIcon className="size-12" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="border-green-500/30 hover:border-green-500/50 text-green-500 size-20"
              onClick={() => handleWordResult(true)}
            >
              <CheckCircle2Icon className="size-12" />
            </Button>
          </div>
        </motion.div>
      ) : (
        <Button
          className="m-4 mt-auto text-xl h-16 bg-gradient-to-r from-primary via-secondary to-primary"
          onClick={startGame}
        >
          <PlayIcon className="h-6 w-6" /> Начать раунд
        </Button>
      )}
    </>
  );
}
