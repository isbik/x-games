"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Play,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { packs } from "./constants";

function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedPack, setSelectedPack] = useState(Object.keys(packs)[0]);
  const [isPackSelectOpen, setIsPackSelectOpen] = useState(false);
  const [prev, setPrev] = useState<string[]>([]);

  const getRandomWord = () => {
    const words = packs[selectedPack];
    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex];

    if (prev.includes(newWord) && prev.length === words.length) {
      getRandomWord();
      return;
    }

    setCurrentWord(newWord);
    setIsWordVisible(true);
    setIsGameStarted(true);
    setPrev((prev) => [...prev, newWord]);
  };

  const handlePackSelect = (pack: string) => {
    setSelectedPack(pack);
    setIsPackSelectOpen(false);
  };

  const startGame = () => {
    if (selectedPack) {
      getRandomWord();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-dvh flex flex-col px-4 sm:px-8 pt-4 sm:pt-8"
    >
      <div className="max-w-lg w-full mx-auto flex flex-col gap-2 grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-700 rounded-2xl p-5 border"
        >
          <h1 className="text-4xl font-bold mb-2 text-white text-center">
            Крокодил 🐊
          </h1>
          <p className="text-center text-white/90 mb-4">
            Покажи слово, пусть другие угадают!
          </p>
          <h3 className="text-lg font-bold text-white mb-3">Как играть:</h3>
          <ol className="space-y-2 text-white/90 list-decimal list-inside text-sm">
            <li>
              Выберите набор слов и нажмите {`"`}Начать Игру{`"`}
            </li>
            <li>
              Нажмите {`"`}Показать{`"`} чтобы увидеть слово
            </li>
            <li>Объясните слово жестами, без слов</li>
            <li>Пусть другие игроки попробуют угадать</li>
            <li>
              Нажмите {`"`}Новое слово{`"`} для следующего раунда
            </li>
          </ol>
        </motion.div>

        <AnimatePresence>
          {!isGameStarted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-5 border border-green-200 shadow-lg"
            >
              <h3 className="text-lg font-bold text-green-800 mb-3">
                Выберите набор слов:
              </h3>

              <div className="relative">
                <button
                  onClick={() => setIsPackSelectOpen(!isPackSelectOpen)}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-900 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-between"
                >
                  <span>{selectedPack}</span>
                  {isPackSelectOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>

                <AnimatePresence>
                  {isPackSelectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-200 rounded-xl shadow-lg z-10 overflow-hidden"
                    >
                      {Object.keys(packs).map((pack) => (
                        <button
                          key={pack}
                          onClick={() => handlePackSelect(pack)}
                          className={`w-full text-left px-4 py-3 hover:bg-green-100 transition-colors ${
                            selectedPack === pack
                              ? "bg-green-100 text-green-800 font-medium"
                              : "text-gray-800"
                          }`}
                        >
                          {pack} ({packs[pack].length} слов)
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto"></div>

        <motion.div
          layout
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-green-700 rounded-t-3xl p-6"
        >
          <AnimatePresence mode="wait">
            {!isGameStarted ? (
              <motion.div
                key="start"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <motion.button
                  onClick={startGame}
                  disabled={!selectedPack}
                  className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-2xl text-xl font-medium transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: selectedPack ? 1.02 : 1 }}
                  whileTap={{ scale: selectedPack ? 0.98 : 1 }}
                >
                  <Play size={24} />
                  Начать Игру
                </motion.button>
              </motion.div>
            ) : (
              <>
                <div className="mb-2">
                  <span className="text-sm text-white/80">
                    Набор: {selectedPack}
                  </span>
                </div>
                <div
                  className="max-h-48 overflow-auto"
                  ref={(ref) => {
                    if (ref) {
                      ref.scrollTop = ref.scrollHeight;
                    }
                  }}
                >
                  {prev.slice(0, -1).map((word) => (
                    <p key={word} className="text-sm text-white">
                      {word}
                    </p>
                  ))}
                </div>
                <div key={currentWord} className="mb-6 pointer-events-none">
                  <p className="text-4xl font-bold text-white">
                    {isWordVisible
                      ? currentWord
                      : "*".repeat(currentWord.length)}
                  </p>
                </div>

                <div className="flex gap-3 z-10">
                  <motion.button
                    onClick={() => setIsWordVisible(!isWordVisible)}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isWordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    {isWordVisible ? "Скрыть" : "Показать"}
                  </motion.button>

                  <motion.button
                    onClick={getRandomWord}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw size={20} />
                    Новое слово
                  </motion.button>
                </div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default App;
