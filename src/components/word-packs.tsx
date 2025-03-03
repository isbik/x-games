"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useWordPacks } from "@/shared/hooks/use-word-packs";

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

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Выбрать набор слов
        </CardTitle>
      </CardHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-gray-50 p-4">
        {packs.map((pack) => (
          <button
            key={pack.name}
            type="button"
            className={`min-h-28 flex items-center justify-center relative flex-col rounded-lg border p-4 transition-colors hover:bg-muted ${
              selectedPacks.includes(pack.name)
                ? "border-primary bg-purple-500/10"
                : "border-border"
            }`}
            onClick={() => togglePack(pack.name)}
          >
            {selectedPacks.includes(pack.name) && (
              <div className="absolute right-2 top-2">
                <CheckIcon className="size-6 text-primary" />
              </div>
            )}
            <h3 className="mt-2 font-medium text-lg">{pack.name}</h3>
            <p className="text-sm text-muted-foreground">
              {pack.words.length} слов
            </p>
          </button>
        ))}
      </div>

      <div className="bg-black/20 h-[1px] mb-4"></div>

      <div className="mx-4 mb-4">
        <Button
          type="submit"
          className="w-full"
          disabled={selectedPacks.length === 0}
        >
          Настройка игры
        </Button>
      </div>
    </form>
  );
}
