"use client";

import { useState } from "react";

import { GameSettings } from "@/app/alias/page";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";

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
    <>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Проверка очков
        </CardTitle>
      </CardHeader>

      <div className="space-y-4 bg-gray-50 p-4 border-b">
        <div className="grid gap-2 ">
          {reviewedWords.map((word, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between rounded-lg border p-4 transition-colors bg-white",
                {
                  "border-blue-500": word.correct,
                  "border-red-500": !word.correct,
                }
              )}
              onClick={() => toggleWord(index)}
            >
              <span className="text-lg">{word.word}</span>
              <Switch checked={word.correct} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between p-4 pb-0">
        <div className="text-lg">
          Всего очков:{" "}
          <span className="font-bold">
            {reviewedWords.filter((w) => w.correct).length}
          </span>
        </div>
        <Button onClick={handleComplete}>Завершить</Button>
      </div>
    </>
  );
}
