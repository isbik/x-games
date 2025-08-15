"use client";

import { GameQueue } from "@/components/game-queue";
import { GameSettings } from "@/components/game-settings";
import { RoundReview } from "@/components/round-review";
import { TeamScore } from "@/components/team-score";
import { TeamSetup } from "@/components/team-setup";
import { WordPacks } from "@/components/word-packs";
import { useState } from "react";

export type Team = {
  id: string;
  name: string;
  color: string;
  emoji: string;
  score: number;
};

export type GameSettings = {
  playTime: number;
  scoreToWin: number;
  selectedPacks: string[];
  subtractPoints: boolean;
};

type Step = "setup" | "packs" | "settings" | "queue" | "review" | "score";

export default function Game() {
  const [step, setStep] = useState<Step>("setup");

  const [teams, setTeams] = useState<Team[]>([]);
  const [settings, setSettings] = useState<GameSettings>({
    playTime: 60,
    scoreToWin: 30,
    selectedPacks: [],
    // отнимать очки за пропуск
    subtractPoints: false,
  });
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [roundWords, setRoundWords] = useState<
    Array<{ word: string; correct: boolean }>
  >([]);

  const nextStep = () => {
    const steps: Record<string, string> = {
      setup: "packs",
      packs: "settings",
      settings: "queue",
      queue: "review",
      review: "score",
      score: "queue",
    };
    setStep(steps[step] as unknown as Step);
  };

  const handleTeamsSubmit = (newTeams: Team[]) => {
    setTeams(newTeams);
    nextStep();
  };

  const handlePacksSelect = (packs: string[]) => {
    setSettings((prev) => ({ ...prev, selectedPacks: packs }));
    nextStep();
  };

  const handleSettingsSubmit = (
    gameSettings: Omit<GameSettings, "selectedPacks">
  ) => {
    setSettings((prev) => ({ ...prev, ...gameSettings }));
    nextStep();
  };

  const handleRoundComplete = (
    words: Array<{ word: string; correct: boolean }>
  ) => {
    setRoundWords(words);
    setStep("review");
  };

  const handleReviewComplete = (points: number) => {
    setTeams((prev) =>
      prev.map((team, idx) =>
        idx === currentTeamIndex
          ? { ...team, score: Math.max(team.score + points, 0) }
          : team
      )
    );
    setStep("score");
  };

  const handleNextTeam = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
    setStep("queue");
  };

  return (
    <div className="min-h-svh flex flex-col grow py-4">
      <div className="mx-auto h-fit p-0 pb-4 flex flex-col w-full overflow-hidden max-w-xl bg-white rounded-2xl shadow-2xl shadow-slate-950">
        {step === "setup" && <TeamSetup onSubmit={handleTeamsSubmit} />}
        {step === "packs" && <WordPacks onSubmit={handlePacksSelect} />}
        {step === "settings" && (
          <GameSettings onSubmit={handleSettingsSubmit} />
        )}
        {step === "queue" && (
          <GameQueue
            teams={teams}
            currentTeam={teams[currentTeamIndex]}
            settings={settings}
            onStart={handleRoundComplete}
          />
        )}

        {step === "review" && (
          <RoundReview
            settings={settings}
            words={roundWords}
            onComplete={handleReviewComplete}
          />
        )}

        {step === "score" && (
          <TeamScore
            teams={teams}
            currentTeam={teams[currentTeamIndex]}
            settings={settings}
            onNextTeam={handleNextTeam}
          />
        )}
      </div>
    </div>
  );
}
