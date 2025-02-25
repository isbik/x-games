"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaRandom, FaTrash, FaRedo } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Task {
  id: number;
  text: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [showTasks, setShowTasks] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [remainingTasks, setRemainingTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim() }]);
      setNewTask("");
    }
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startGame = () => {
    if (tasks.length > 0) {
      setRemainingTasks([...tasks]);
      setGameStarted(true);
      setCurrentTask(null);
    }
  };

  const drawTask = () => {
    if (remainingTasks.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingTasks.length);
      const task = remainingTasks[randomIndex];
      setCurrentTask(task);
      setRemainingTasks(remainingTasks.filter((t) => t.id !== task.id));
    } else if (tasks.length > 0) {
      setRemainingTasks([...tasks]);
      setCurrentTask(null);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentTask(null);
    setRemainingTasks([]);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-tr from-yellow-500 via-pink-500 to-blue-500 flex flex-col items-center justify-end">
      <div className="max-w-md w-full mx-auto bg-white rounded-t-xl overflow-hidden shadow-2xl shadow-slate-950">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-purple-600">
            Фанты
          </h1>

          {!gameStarted ? (
            <>
              <div className="mb-4 flex flex-col gap-2">
                <div className="space-y-2 mb-4">
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <span>
                        {showTasks ? task.text : "*".repeat(task.text.length)}
                      </span>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {tasks.length > 1 && (
                  <button
                    onClick={startGame}
                    className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Начать игру
                  </button>
                )}

                <div className="flex items-center mt-2 ml-1">
                  <input
                    id="showTasks"
                    type="checkbox"
                    checked={showTasks}
                    onChange={(e) => setShowTasks(e.target.checked)}
                    className="mr-2 accent-purple-500"
                    disabled={tasks.length !== 0}
                  />
                  <label htmlFor="showTasks">Показать задания</label>
                </div>

                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                    placeholder="Введите задание..."
                    className="flex-1 p-2 border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Button
                    onClick={addTask}
                    className="bg-purple-500 text-white p-2 hover:bg-purple-600 transition-colors shrink-0"
                    size={"icon"}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <AnimatePresence mode="wait">
                {currentTask ? (
                  <motion.div
                    key={currentTask.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mb-6 p-4 bg-purple-100 rounded-lg mt-2"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      Ваше задание:
                    </h2>
                    <p className="text-2xl text-purple-600">
                      {currentTask.text}
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6 text-gray-600"
                  >
                    Нажмите кнопку, чтобы получить задание
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                <button
                  onClick={drawTask}
                  className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FaRandom />
                  {remainingTasks.length === 0
                    ? "Начать новый круг"
                    : "Вытянуть фант"}
                </button>

                <button
                  onClick={resetGame}
                  className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FaRedo />
                  Вернуться к редактированию
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Осталось заданий: {remainingTasks.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
