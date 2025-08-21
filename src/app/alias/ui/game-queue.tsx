"use client";

import type { GameSettings, Team } from "@/app/alias/page";
import { Button } from "@/components/ui/button";
import { cn, shuffle } from "@/lib/utils";
import { useEndTimer } from "@/shared/hooks/use-end-timer";
import { useWordPacks } from "@/shared/hooks/use-word-packs";
import { motion } from "framer-motion";
import {
  CheckCircle2Icon,
  PauseIcon,
  PlayIcon,
  XCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set()); // Track used words

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
    setUsedWords(new Set([words[0]])); // Initialize with the first word
  };

  const togglePause = () => setIsPaused(!isPaused);

  const handleWordResult = (correct: boolean) => {
    setSwipeDirection(correct ? "right" : "left");

    setCurrentWords((prev) => {
      const newArray = [...prev];
      newArray[currentWordIndex].correct = correct;
      return newArray;
    });

    setTimeout(() => {
      let nextWordIndex = currentWordIndex + 1;

      // Find the next word that hasn't been used yet
      while (
        nextWordIndex < words.length &&
        usedWords.has(words[nextWordIndex])
      ) {
        nextWordIndex++;
      }

      if (nextWordIndex >= words.length) {
        // No more unique words left
        setIsPlaying(false);
        onStart(currentWords);
        return;
      }

      const nextWord = words[nextWordIndex];
      setCurrentWordIndex(nextWordIndex);
      setCurrentWords((prev) => [...prev, { word: nextWord, correct: false }]);
      setUsedWords((prev) => new Set(prev).add(nextWord)); // Add the new word to usedWords
      setSwipeDirection(null);

      if (timeLeft === 0) {
        setIsPlaying(false);
        onStart(currentWords);
        return;
      }
    }, 500);
  };

  return (
    <>
      <div className="flex gap-2 py-4">
        <div className="flex items-center gap-3 mr-auto">
          <span
            className={cn(
              "text-3xl rounded-full size-12 flex items-center justify-center font-bold",
              currentTeam.color
            )}
          >
            {currentTeam.emoji}
          </span>
          <div className="space-y-1">
            <span className="block text-2xl font-bold">{currentTeam.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-3xl font-mono font-bold">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
          {isPlaying && (
            <Button
              size="icon"
              className="text-lg bg-blue-500 hover:bg-blue-600"
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
      </div>

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
          className="m-4 relative self-stretch grow flex flex-col items-center justify-center p-8"
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
          className="text-xl h-16 bg-blue-500 my-auto"
          onClick={startGame}
        >
          <PlayIcon className="h-6 w-6" /> Начать раунд
        </Button>
      )}
    </>
  );
}
