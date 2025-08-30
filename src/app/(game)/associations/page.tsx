"use client";

import { CardGame } from "@/components/card-game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import React, { useState } from "react";

interface WordEntry {
  word: string;
  timestamp: number;
  isHidden?: boolean;
}

function App() {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [firstPlayerMode, setFirstPlayerMode] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentWord.trim()) return;

    // Check if word already exists
    if (
      words.some(
        (entry) => entry.word.toLowerCase() === currentWord.toLowerCase()
      )
    ) {
      setGameOver(true);
      return;
    }

    const newEntry = {
      word: currentWord,
      timestamp: Date.now(),
      isHidden: true,
    };

    setWords((prev) => [...prev, newEntry]);
    setCurrentWord("");
    setFirstPlayerMode(false);
  };

  const resetGame = () => {
    setWords([]);
    setCurrentWord("");
    setGameOver(false);
    setFirstPlayerMode(true);
  };

  return (
    <CardGame className="gap-4 m-4 rounded-xl max-w-md mx-auto w-full">
      {!gameOver ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              placeholder={
                firstPlayerMode ? "Напишите слово..." : "Напишите ассоциацию..."
              }
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Отправить слово
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-red-500 font-bold">
            Игра окончена! Слово: {words[0].word}
          </p>
          <button
            onClick={resetGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Начать новую игру
          </button>
        </div>
      )}

      {firstPlayerMode && words.length === 0 && (
        <ol className="text-blue-600 text-sm bg-blue-50 p-4 rounded-lg">
          <li>
            Первый игрок мысленно выбирает любое слово
            (например:&quot;звезда&quot;).
          </li>
          <li>
            Придумывает ассоциацию к этому слову (например: &quot;ночь&quot;).
          </li>
          <li>Пишет придуманное слово и отправляет слово следующему игроку.</li>
        </ol>
      )}

      {words.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold text-gray-700">Цепочка ассоциаций:</h2>
          <div
            className="bg-gray-100 rounded-lg p-4 max-h-60 overflow-y-auto flex flex-col gap-2"
            ref={(ref) => {
              if (ref) {
                ref.scrollTop = ref.scrollHeight;
              }
            }}
          >
            {words.map((entry, index) => {
              return (
                <div
                  key={entry.timestamp}
                  className="flex items-center space-x-2"
                >
                  <span className="text-blue-500 font-bold">{index + 1}.</span>
                  <span className="text-gray-800 grow break-words">
                    {entry.isHidden
                      ? "*".repeat(entry.word.length)
                      : entry.word}
                  </span>

                  <Button
                    variant={"ghost"}
                    className="px-2 border-none text-blue-500"
                    onClick={() => {}}
                  >
                    <Eye className="size-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </CardGame>
  );
}

export default App;
