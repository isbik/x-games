"use client";

import { Footer } from "@/components/footer";
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
    bgColor: "from-purple-400 to-indigo-500",
    borderColor: "border-purple-400",
    hoverColor: "hover:shadow-purple-200",
  },
  {
    id: "2",
    name: "Фанты",
    description:
      "Весёлые задания для компании! Испытай себя в забавных испытаниях!",
    icon: "🎲",
    url: "/fanti",
    bgColor: "from-amber-400 to-orange-500",
    borderColor: "border-amber-400",
    hoverColor: "hover:shadow-amber-200",
  },
  {
    id: "3",
    name: "Ассоциации",
    description: "Соединяй слова, ищи неожиданные связи и удивляй друзей!",
    icon: "💡",
    url: "/associations",
    bgColor: "from-blue-400 to-cyan-500",
    borderColor: "border-blue-400",
    hoverColor: "hover:shadow-blue-200",
  },
  {
    id: "4",
    name: "Шпион",
    description: "Кто среди вас шпион? Определи его, пока не стало поздно!",
    icon: "🕶️",
    url: "/spy",
    bgColor: "from-gray-600 to-gray-800",
    borderColor: "border-gray-600",
    hoverColor: "hover:shadow-gray-300",
  },
  {
    id: "5",
    name: "Крокодил",
    description: "Показывай слова без слов! Угадай быстрее всех!",
    icon: "🐊",
    url: "/crocodile",
    bgColor: "from-green-400 to-emerald-500",
    borderColor: "border-green-400",
    hoverColor: "hover:shadow-green-200",
  },
  {
    id: "6",
    name: "Слова на скорость",
    description: "Назови как можно больше слов по теме и букве за время!",
    icon: "⚡",
    url: "/words-rush",
    bgColor: "from-yellow-400 to-amber-500",
    borderColor: "border-yellow-400",
    hoverColor: "hover:shadow-yellow-200",
  },
  {
    id: "7",
    name: "Круг слов",
    description: "Говори слова с выделенной буквой до истечения времени!",
    icon: "⏳",
    url: "/circle-words",
    bgColor: "from-rose-400 to-pink-500",
    borderColor: "border-rose-400",
    hoverColor: "hover:shadow-pink-200",
  },
];

export default function Games() {
  return (
    <>
      <div className="max-w-7xl mx-auto mt-12 flex flex-col grow gap-4 p-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 bg-white w-fit mx-auto px-4 py-2 rounded-t-lg shadow-lg border border-gray-200 border-b-0">
            Игры для компании
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto bg-white w-fit px-4 py-2 rounded-lg shadow-lg border border-gray-200">
            Выберите игру для весёлого времяпрепровождения с друзьями
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {games.map((game) => (
            <Link key={game.id} href={game.url} className="group">
              <Card
                className={`transition-all duration-300 h-full rounded-2xl bg-gradient-to-br ${game.bgColor} border-0 overflow-hidden relative`}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-300" />

                <CardHeader className="flex flex-col items-center space-y-4 pb-3 relative z-10">
                  <div
                    className={`text-5xl transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6 ${game.hoverColor}`}
                  >
                    {game.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white text-center">
                    {game.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow relative z-10">
                  <p className="text-sm text-white/90 font-medium text-center px-2">
                    {game.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
