"use client";

import type React from "react";

import type { Team } from "@/app/alias/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PLAYER_ICONS } from "@/shared/constants";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

const COLORS = [
  "bg-red-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-300",
  "bg-blue-300",
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
      emoji: PLAYER_ICONS[0],
      score: 0,
    },
    {
      id: "2",
      name: NAMES[1],
      color: COLORS[1],
      emoji: PLAYER_ICONS[1],
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
        emoji: PLAYER_ICONS[teams.length % PLAYER_ICONS.length],
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
    <form
      className="flex flex-col max-h-dvh gap-4 py-4 grow overflow-hidden"
      onSubmit={handleSubmit}
    >
      <h1>Выбор команды</h1>

      <div className="space-y-2 overflow-auto -m-4 p-4 grow">
        {teams.map((team) => (
          <div
            key={team.id}
            className={cn(
              "flex items-center gap-4 rounded-lg border p-4 flex-wrap bg-gray-50 h-24"
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
        className="w-full"
        onClick={addTeam}
        disabled={teams.length >= 8}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Добавить команду
      </Button>

      <div className="bg-gray-500/20 h-[1px] -mx-4"></div>

      <Button type="submit" className="w-full mt-auto">
        Выбрать набор слов
      </Button>
    </form>
  );
}
