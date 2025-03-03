"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { GameSettings } from "@/app/alias/page";
import { Switch } from "./ui/switch";
import { useSessionStorage } from "@/shared/hooks/use-session-storage";

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
    <form onSubmit={handleSubmit}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Настройка игры
        </CardTitle>
      </CardHeader>
      <div className="space-y-4 p-4 bg-gray-50">
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
        <div className="flex items-center space-x-2 justify-between">
          <Label htmlFor="subtractPoints">Отнимать очки за ошибки</Label>
          <Switch
            id="subtractPoints"
            checked={subtractPoints}
            onCheckedChange={setSubtractPoints}
          />
        </div>
      </div>

      <div className="bg-black/20 h-[1px] mb-4"></div>

      <div className="mx-4">
        <Button type="submit" className="w-full">
          Начать игру
        </Button>
      </div>
    </form>
  );
}
