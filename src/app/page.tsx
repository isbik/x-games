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
  {
    id: "8",
    name: "Бутылочка",
    description: "На кого покажет бутылочка?",
    icon: "🍾",
    url: "/bottle",
    bgColor: "from-pink-400 to-fuchsia-500",
  },
];

export default function Games() {
  return (
    <>
      {/* <Header /> */}

      <div className="max-w-7xl mx-auto flex flex-col grow gap-4 p-4">
        <div className="text-center relative sm:py-8">
          <div className="relative inline-block mx-auto">
            <div className="absolute -inset-2 bg-blue-100 rounded-xl blur-md opacity-70"></div>
            <div className="absolute -inset-1 bg-blue-50 rounded-lg"></div>
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-blue-500 bg-white relative px-10 py-5 rounded-lg shadow-lg border-2 border-blue-100 transform rotate-1">
              🎲 Игры для компании
            </h1>
          </div>

          <div className="relative -mt-2">
            <p className="sm:text-lg text-gray-600 max-w-2xl mx-auto px-8 py-4 bg-white rounded-[20px] shadow-lg border-2 border-blue-100 relative z-10">
              Не откладывай наслаждение - выбери игру и начнём! 😄
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-4 sm:my-auto">
          {games.map((game) => (
            <Link key={game.id} href={game.url} className="group">
              <Card
                className={`transition-all duration-300 h-full rounded-2xl bg-gradient-to-br ${game.bgColor} border-0 overflow-hidden relative`}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-300" />

                <CardHeader className="flex flex-col items-center space-y-2 sm:space-y-4 pb-3 relative z-10">
                  <div
                    className={`text-5xl transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6 ${game.hoverColor}`}
                  >
                    {game.icon}
                  </div>
                  <CardTitle className="text-lg sm:text-2xl font-bold text-white text-center max-sm:leading-5">
                    {game.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow relative z-10">
                  <p className="text-xs sm:text-sm text-white/90 font-medium text-center px-2">
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
