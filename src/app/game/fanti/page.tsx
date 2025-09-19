"use client";

import { CardGame } from "@/components/card-game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaRandom, FaRedo, FaTrash } from "react-icons/fa";

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
    <div className="flex flex-col grow">
      <CardGame className="m-4 rounded-xl max-w-md w-full mx-auto">
        {!gameStarted ? (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  placeholder="Введите задание..."
                />
                <Button
                  onClick={addTask}
                  className="bg-blue-500 size-12 text-white p-2 hover:bg-blue-600 transition-colors shrink-0"
                >
                  <FaPlus />
                </Button>
              </div>

              <label className="flex items-center my-2">
                <Switch
                  checked={showTasks}
                  onCheckedChange={(value) => setShowTasks(value)}
                  className="mr-2 accent-blue-500"
                  disabled={tasks.length !== 0}
                />
                <p>Показывать задания</p>
              </label>

              {tasks.length !== 0 && (
                <div className="space-y-2 mb-4">
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <span className="truncate">
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
              )}

              {tasks.length > 1 && (
                <button
                  onClick={startGame}
                  className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Начать игру
                </button>
              )}
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
                  className="mb-4 p-4 bg-blue-100 rounded-lg mt-2"
                >
                  <h2 className="text-xl font-semibold mb-2">Ваше задание:</h2>
                  <p className="text-2xl text-blue-600 break-all">
                    {currentTask.text}
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 text-gray-600"
                >
                  Нажмите кнопку, чтобы получить задание
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <Button onClick={drawTask} className="w-full py-6">
                <FaRandom />
                {remainingTasks.length === 0
                  ? "Начать новый круг"
                  : "Вытянуть фант"}
              </Button>

              <Button
                className="w-full py-6"
                variant={"outline"}
                onClick={resetGame}
              >
                <FaRedo />
                Вернуться к редактированию
              </Button>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Осталось заданий: {remainingTasks.length}
            </p>
          </div>
        )}
      </CardGame>
    </div>
  );
}

export default App;
