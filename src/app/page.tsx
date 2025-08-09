"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const games = [
  {
    id: "1",
    name: "Alias",
    description:
      "Объясняй слова без их названия! Сможешь ли ты перехитрить друзей?",
    icon: "🎭",
    url: "/alias",
  },
  {
    id: "2",
    name: "Фанты",
    description:
      "Весёлые задания для компании! Испытай себя в забавных испытаниях!",
    icon: "🎲",
    url: "/fanti",
  },
  {
    id: "3",
    name: "Ассоциации",
    description: "Соединяй слова, ищи неожиданные связи и удивляй друзей!",
    icon: "💡",
    url: "/associations",
  },
  {
    id: "4",
    name: "Шпион",
    description: "Кто среди вас шпион? Определи его, пока не стало поздно!",
    icon: "🕶️",
    url: "/spy",
  },
  {
    id: "5",
    name: "Крокодил",
    description: "Кто среди вас крокодил? Покажи его, пока поздно!",
    icon: "🐊",
    url: "/crocodile",
  },
  {
    id: "6",
    name: "Слова на скорость",
    description:
      "Собирай как можно больше карт, правильно и быстро называя слова по теме и букве!",
    icon: "⚡",
    url: "/words-rush",
  },
];

export default function Games() {
  return (
    <div className="flex items-center justify-center p-6 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 min-h-svh">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {games.map((game) => (
          <Link key={game.id} href={game.url} className="group">
            <Card className="transition-all duration-300 h-full rounded-2xl bg-white border-4 border-blue-400 flex flex-col group hover:shadow-2xl">
              <CardHeader className="flex items-center space-x-3 pb-3">
                <span className="text-4xl transition-all duration-300 group-hover:scale-150 group-hover:-translate-y-2 group-hover:text-blue-600">
                  {game.icon}
                </span>
                <CardTitle className="text-xl font-bold text-gray-800 text-center transition-all duration-300 group-hover:text-blue-700">
                  {game.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 font-medium text-center transition-all duration-300 group-hover:text-gray-800 group-hover:font-semibold">
                  {game.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
