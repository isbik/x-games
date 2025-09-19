"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Play, RefreshCw } from "lucide-react";
import { useState } from "react";
import { packs } from "./constants";

function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedPack, setSelectedPack] = useState(Object.keys(packs)[0]);
  const [prev, setPrev] = useState<string[]>([]);

  const getRandomWord = () => {
    const words = packs[selectedPack];
    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex];

    if (prev.includes(newWord) && prev.length !== words.length) {
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
      className="grow flex flex-col p-4 pb-0"
    >
      <div className="max-w-lg w-full mx-auto flex flex-col gap-2 grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 border"
        >
          <p className="text-center text-xl  mb-4">
            Покажи слово, пусть другие угадают!
          </p>
          <h3 className="text-lg font-bold mb-1 text-blue-500">Как играть:</h3>
          <ol className="space-y-2 list-decimal list-inside text-sm">
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
              className="bg-white rounded-2xl p-5 border  shadow-lg"
            >
              <Select
                value={selectedPack}
                items={Object.keys(packs)}
                onChangeValue={handlePackSelect}
                label="Выберите набор слов:"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto"></div>

        <div className="bg-blue-700 rounded-t-3xl p-6">
          <AnimatePresence mode="wait">
            {!isGameStarted ? (
              <Button
                onClick={startGame}
                disabled={!selectedPack}
                className="w-full py-6 text-lg font-bold"
              >
                <Play className="size-4" />
                Начать Игру
              </Button>
            ) : (
              <>
                <div className="mb-2">
                  <span className="text-sm text-white/80">
                    Набор: {selectedPack}
                  </span>
                </div>
                <div
                  className="max-h-48 overflow-auto no-scrollbar"
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
        </div>
      </div>
    </motion.div>
  );
}

export default App;
