"use client";

import { CardGame } from "@/components/card-game";
import { Brain } from "lucide-react";
import React, { useState } from "react";

interface WordEntry {
  word: string;
  timestamp: number;
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
    <CardGame className="gap-4 m-4 rounded-xl">
      <div className="flex items-center justify-center space-x-2">
        <Brain className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold text-blue-600">Ассоциация</h1>
      </div>

      {!gameOver ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition-colors"
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
          <li>Пишет только ассоциацию и отправляет слово следующему игроку.</li>
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
              const isHidden = words.length < 2;

              return (
                <div
                  key={entry.timestamp}
                  className="flex items-center space-x-2"
                >
                  <span className="text-blue-500 font-bold">{index + 1}.</span>
                  <span className="text-gray-800">
                    {isHidden ? "*".repeat(entry.word.length) : entry.word}
                  </span>
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
