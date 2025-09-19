"use client";

import type React from "react";

import { useState } from "react";

import type { GameSettings } from "@/app/(game)/alias/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSessionStorage } from "@/shared/hooks/use-session-storage";
import { Switch } from "../../../../components/ui/switch";

export function GameSettings({
  onSubmit,
}: {
  onSubmit: (settings: Omit<GameSettings, "selectedPacks">) => void;
}) {
  const [playTime, setPlayTime] = useState(60);
  const [scoreToWin, setScoreToWin] = useState(25);
  const [subtractPoints, setSubtractPoints] = useSessionStorage(
    "subtractPoints",
    false
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ playTime, scoreToWin, subtractPoints });
  };

  return (
    <form
      className="flex flex-col max-h-dvh gap-4 py-4 grow overflow-hidden"
      onSubmit={handleSubmit}
    >
      <h1>Настройки</h1>

      <div className="space-y-2 overflow-auto -m-4 p-4 grow">
        <div className="space-y-2">
          <Label>Время игры (секунд)</Label>
          <div className="flex gap-2 flex-wrap">
            {[10, 20, 30, 60, 90, 120].map((time) => (
              <button
                type="button"
                key={time}
                className={`px-4 py-2 rounded-lg border ${
                  playTime === time ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setPlayTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Очков для победы</Label>
          <div className="flex gap-2 flex-wrap">
            {[10, 15, 20, 25, 30, 40, 50].map((score) => (
              <button
                type="button"
                key={score}
                className={`px-4 py-2 rounded-lg border ${
                  scoreToWin === score
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setScoreToWin(score)}
              >
                {score}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2 py-2">
          <Label htmlFor="subtractPoints">Отнимать очки за ошибки</Label>
          <Switch
            id="subtractPoints"
            checked={subtractPoints}
            onCheckedChange={setSubtractPoints}
          />
        </div>
      </div>

      <div className="bg-gray-500/20 h-[1px] -mx-4"></div>

      <Button type="submit" className="w-full">
        Начать игру
      </Button>
    </form>
  );
}
