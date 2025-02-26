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
];

export default function Games() {
  return (
    <div className="flex items-center justify-center p-6 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 min-h-screen">
      <div className="flex flex-col space-y-6 max-w-lg w-full">
        {games.map((game) => (
          <Link key={game.id} href={game.url} className="group">
            <Card className="transition-transform transform group-hover:scale-105 shadow-lg rounded-2xl bg-white border-4 border-cyan-400">
              <CardHeader className="flex items-center space-x-3">
                <span className="text-3xl">{game.icon}</span>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {game.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 font-medium">
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
