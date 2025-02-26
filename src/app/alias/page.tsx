"use client";

import { useState } from "react";
import { TeamSetup } from "@/components/team-setup";
import { WordPacks } from "@/components/word-packs";
import { GameSettings } from "@/components/game-settings";
import { GameQueue } from "@/components/game-queue";
import { RoundReview } from "@/components/round-review";
import { TeamScore } from "@/components/team-score";

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
};

type Step = "setup" | "packs" | "settings" | "queue" | "review" | "score";

export default function Game() {
  const [step, setStep] = useState<Step>("setup");

  const [teams, setTeams] = useState<Team[]>([]);
  const [settings, setSettings] = useState<GameSettings>({
    playTime: 60,
    scoreToWin: 30,
    selectedPacks: [],
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
          ? { ...team, score: team.score + points }
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
    <div className="min-h-screen bg-gradient-to-b flex flex-col grow">
      <div className="mx-auto px-0 flex flex-col grow w-full overflow-hidden">
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
          <RoundReview words={roundWords} onComplete={handleReviewComplete} />
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
