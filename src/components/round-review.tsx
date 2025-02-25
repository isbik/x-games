"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

export function RoundReview({
  words,
  onComplete,
}: {
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
    const points = reviewedWords.filter((word) => word.correct).length;
    onComplete(points);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Проверка очков</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            {reviewedWords.map((word, index) => (
              <button
                key={index}
                onClick={() => toggleWord(index)}
                className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                  word.correct
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted"
                }`}
              >
                <span className="text-lg">{word.word}</span>
                {word.correct ? (
                  <CheckIcon className="h-5 w-5 text-primary" />
                ) : (
                  <XIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <div className="text-lg">
              Всего очков:{" "}
              <span className="font-bold">
                {reviewedWords.filter((w) => w.correct).length}
              </span>
            </div>
            <Button onClick={handleComplete}>Завершить</Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}
