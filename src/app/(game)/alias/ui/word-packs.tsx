"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useWordPacks } from "@/shared/hooks/use-word-packs";
import { CheckIcon } from "lucide-react";

export function WordPacks({
  onSubmit,
}: {
  onSubmit: (packs: string[]) => void;
}) {
  const packs = useWordPacks();

  const [selectedPacks, setSelectedPacks] = useState<string[]>([
    "Стартовый набор",
  ]);

  const togglePack = (packId: string) => {
    setSelectedPacks((current) =>
      current.includes(packId)
        ? current.filter((id) => id !== packId)
        : [...current, packId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPacks.length > 0) {
      onSubmit(selectedPacks);
    }
  };

  console.log(packs.map((pack) => pack.name));
  return (
    <form className="flex flex-col py-4 gap-4 grow" onSubmit={handleSubmit}>
      <h1 className="border-b-">Выбрать набор слов</h1>

      <div className="bg-gray-500/20 h-[1px] -mx-4"></div>

      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 -m-4 p-4 mb-auto">
        {packs.map((pack) => (
          <button
            key={pack.name}
            type="button"
            className={`min-h-32 flex items-center justify-center relative flex-col rounded-lg border p-4 transition-colors hover:bg-blue-500/10 ${
              selectedPacks.includes(pack.name)
                ? "border-blue-500 bg-blue-500/20"
                : "border-gray-200"
            }`}
            onClick={() => togglePack(pack.name)}
          >
            {selectedPacks.includes(pack.name) && (
              <div className="absolute right-2 top-2 bg-blue-500 rounded-full p-1">
                <CheckIcon className="size-4 text-white" />
              </div>
            )}
            <p className="text-xl">{pack.emoji}</p>
            <h3 className="mt-2 font-medium text-lg">{pack.name}</h3>
            <p className="text-sm text-muted-foreground">
              {pack.words.length} слов
            </p>
          </button>
        ))}
      </div>

      <div className="bg-gray-500/20 h-[1px] -mx-4"></div>

      <Button
        type="submit"
        className="w-full"
        disabled={selectedPacks.length === 0}
      >
        Настройка игры
      </Button>
    </form>
  );
}
