"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2Icon, PlusIcon } from "lucide-react";
import type { Team } from "@/app/alias/page";
import { cn } from "@/lib/utils";

const EMOJI_LIST = ["🦁", "🐯", "🐻", "🐨", "🐼", "🐸", "🦊", "🦉", "🦋", "🐢"];

const COLORS = [
  "bg-red-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-300",
  "bg-purple-300",
  "bg-pink-300",
  "bg-orange-300",
  "bg-teal-300",
];

const NAMES = [
  "Красные",
  "Синие",
  "Зеленые",
  "Желтые",
  "Фиолетовые",
  "Розовые",
  "Оранжевые",
  "Теаловые",
];

export function TeamSetup({ onSubmit }: { onSubmit: (teams: Team[]) => void }) {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: NAMES[0],
      color: COLORS[0],
      emoji: EMOJI_LIST[0],
      score: 0,
    },
    {
      id: "2",
      name: NAMES[1],
      color: COLORS[1],
      emoji: EMOJI_LIST[1],
      score: 0,
    },
  ]);

  const addTeam = () => {
    if (teams.length >= 8) return;
    const newId = (teams.length + 1).toString();
    setTeams([
      ...teams,
      {
        id: newId,
        name: NAMES[teams.length % NAMES.length],
        color: COLORS[teams.length % COLORS.length],
        emoji: EMOJI_LIST[teams.length % EMOJI_LIST.length],
        score: 0,
      },
    ]);
  };

  const removeTeam = (id: string) => {
    if (teams.length <= 2) return;
    setTeams(teams.filter((team) => team.id !== id));
  };

  const updateTeam = (id: string, field: keyof Team, value: string) => {
    setTeams(
      teams.map((team) => (team.id === id ? { ...team, [field]: value } : team))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teams.every((team) => team.name.trim())) {
      onSubmit(teams);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Выбор команды
        </CardTitle>
      </CardHeader>

      <CardContent className="bg-slate-100 py-4">
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className={cn(
                "flex items-center gap-4 rounded-lg border p-4 flex-wrap bg-white"
              )}
            >
              <div className="flex flex-1">
                <span
                  className={cn(
                    "inline-flex h-8 w-8 mr-2 items-center justify-center rounded-full shrink-0",
                    team.color
                  )}
                >
                  {team.emoji}
                </span>
                <Input
                  id={`team-${team.id}`}
                  value={team.name}
                  onChange={(e) => updateTeam(team.id, "name", e.target.value)}
                  placeholder="Enter team name"
                  required
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 float-right"
                onClick={() => removeTeam(team.id)}
                disabled={teams.length <= 2}
              >
                <Trash2Icon className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full"
          onClick={addTeam}
          disabled={teams.length >= 8}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Добавить команду
        </Button>
      </CardContent>

      <div className="bg-black/20 h-[1px] mb-4"></div>

      <div className="mx-4">
        <Button type="submit" className="w-full">
          Выбрать набор слов
        </Button>
      </div>
    </form>
  );
}
