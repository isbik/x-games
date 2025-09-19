"use client";

import type { GameSettings, Team } from "@/app/(game)/alias/page";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export function TeamScore({
  teams,
  currentTeam,
  settings,
  onNextTeam,
  onReset,
}: {
  teams: Team[];
  currentTeam: Team;
  settings: GameSettings;
  onNextTeam: () => void;
  onReset: () => void;
}) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner =
    sortedTeams[0].score >= settings.scoreToWin ? sortedTeams[0] : null;

  return (
    <div className="flex flex-col max-h-dvh gap-4 py-4 grow">
      <h1>{winner ? "Игра окончена!" : "Текущие очки"}</h1>

      <div className="bg-gray-500/20 h-[1px] -mx-4"></div>

      <div className="space-y-2 -m-4 p-4 bg-gray-50 overflow-auto grow">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`flex items-center justify-between rounded-lg border p-4 bg-white ${
              team.id === currentTeam.id ? "border-primary" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{team.emoji}</span>
              <span className={`h-3 w-3 rounded-full ${team.color}`} />
              <span className="font-medium">{team.name}</span>
            </div>
            <div className="text-xl font-bold">
              {team.score} из {settings.scoreToWin}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-500/20 h-[1px] -mx-4"></div>

      {winner ? (
        <div className="flex flex-col gap-2">
          <div className="justify-center inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary text-center">
            <Trophy className="h-5 w-5" />
            <span className="font-medium">{winner.name} выиграли!</span>
          </div>

          <Button className="w-full" onClick={onReset}>
            Сбросить
          </Button>
        </div>
      ) : (
        <div className="mx-4">
          <Button className="w-full" onClick={onNextTeam}>
            Следующий ход
          </Button>
        </div>
      )}
    </div>
  );
}
