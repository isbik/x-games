"use client";

import React, { useState } from "react";
import { Brain } from "lucide-react";

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
    <div className="min-h-svh bg-gradient-to-b from-purple-100 to-pink-100 px-4 pt-4 flex flex-col justify-end">
      <div className="max-w-md w-full mx-auto bg-white rounded-t-2xl shadow-xl p-6 space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <Brain className="w-8 h-8 text-purple-500" />
          <h1 className="text-2xl font-bold text-purple-600">Ассоциация</h1>
        </div>

        {firstPlayerMode && words.length === 0 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-600 text-sm">
              Первый игрок придумает ассоциацию и слово
            </p>
          </div>
        )}

        {words.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Цепочка ассоциаций:</h2>
            <div
              className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto"
              ref={(ref) => {
                if (ref) {
                  ref.scrollTop = ref.scrollHeight;
                }
              }}
            >
              {words.map((entry, index) => {
                const isHidden = index === 0;

                return (
                  <div
                    key={entry.timestamp}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <span className="text-purple-500 font-bold">
                      {index + 1}.
                    </span>
                    <span className="text-gray-800">
                      {isHidden ? "*".repeat(entry.word.length) : entry.word}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!gameOver ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={currentWord}
                onChange={(e) => setCurrentWord(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder={
                  firstPlayerMode
                    ? "Напишите слово..."
                    : "Напишите ассоциацию..."
                }
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
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
      </div>
    </div>
  );
}

export default App;
