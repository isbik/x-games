"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const games = [
  {
    id: "1",
    name: "Alias",
    description: "Игра где нужно угадать слово",
    icon: "🤔",
    url: "/alias",
  },
  {
    id: "2",
    name: "Фанты",
    description:
      "Игра где нужно выполнять задания из списка придуманных компанией",
    icon: "🔗",
    url: "/fanti",
  },
];

export default function Games() {
  return (
    <div className="flex items-center justify-center p-4 container">
      <div className="flex flex-col space-y-4">
        {games.map((game) => (
          <Link key={game.id} href={`${game.url}`}>
            <Card key={game.id}>
              <CardHeader>
                <CardTitle>
                  {game.icon}
                  {game.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{game.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
