"use client";

import { useState } from "react";

import { GameSettings } from "@/app/(game)/alias/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "../../../../components/ui/switch";

export function RoundReview({
  words,
  settings,
  onComplete,
}: {
  settings: GameSettings;
  words: Array<{ word: string; correct: boolean }>;
  onComplete: (points: number) => void;
}) {
  const [reviewedWords, setReviewedWords] = useState(words);

  const toggleWord = (index: number) => {
    setReviewedWords((prev) =>
      prev.map((word, i) =>
        i === index ? { ...word, correct: !word.correct } : word
      )
    );
  };

  const handleComplete = () => {
    const points = reviewedWords.reduce((acc, word) => {
      if (!settings.subtractPoints) return acc + (word.correct ? 1 : 0);
      return acc + (word.correct ? 1 : -1);
    }, 0);

    onComplete(points);
  };

  return (
    <div className="flex flex-col gap-4 py-4 grow">
      <div className="flex items-center">
        <h1 className="mr-auto">Проверка очков</h1>
        <span className="font-bold bg-blue-100 rounded px-1 ml-1 text-blue-600 border-blue-400 border">
          {reviewedWords.filter((w) => w.correct).length}
        </span>
      </div>

      <div className="bg-black/20 h-[1px] -mx-4"></div>

      <div className="grid gap-2 overflow-auto -m-4 p-4">
        {reviewedWords.map((word, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between rounded-lg border p-4 transition-colors bg-white",
              word.correct
                ? "border-green-500 bg-green-100"
                : "border-red-500 bg-red-50"
            )}
            onClick={() => toggleWord(index)}
          >
            <span className="text-lg">{word.word}</span>
            <Switch checked={word.correct} />
          </div>
        ))}
      </div>
      <div className="bg-black/20 h-[1px] -mx-4"></div>
      <Button onClick={handleComplete}>Завершить</Button>
    </div>
  );
}
