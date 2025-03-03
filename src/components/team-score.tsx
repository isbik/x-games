"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import type { Team, GameSettings } from "@/app/alias/page";

export function TeamScore({
  teams,
  currentTeam,
  settings,
  onNextTeam,
}: {
  teams: Team[];
  currentTeam: Team;
  settings: GameSettings;
  onNextTeam: () => void;
}) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner =
    sortedTeams[0].score >= settings.scoreToWin ? sortedTeams[0] : null;

  return (
    <>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {winner ? "Игра окончена!" : "Текущие очки"}
        </CardTitle>
      </CardHeader>

      <div className="bg-black/20 h-[1px]"></div>

      <div className="space-y-2 p-4 bg-gray-50">
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

      <div className="bg-black/20 h-[1px] mb-4"></div>

      {winner ? (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
            <Trophy className="h-5 w-5" />
            <span className="font-medium">{winner.name} Wins!</span>
          </div>
        </div>
      ) : (
        <div className="mx-4">
          <Button className="w-full" onClick={onNextTeam}>
            Следующий ход
          </Button>
        </div>
      )}
    </>
  );
}
