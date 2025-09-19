"use client";

import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GAMES } from "@/shared/constants/games";
import { InstallButton } from "@/widgets/install-button";
import { SiteHeader } from "@/widgets/site-header";
import Link from "next/link";

export default function Games() {
  return (
    <>
      <SiteHeader />

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
          {GAMES.map((game) => (
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

      <InstallButton />

      <Footer />
    </>
  );
}
