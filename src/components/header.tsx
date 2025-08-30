"use client";

import { GAMES } from "@/shared/constants/games";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const game = GAMES.find((game) => {
    return pathname.startsWith(game.url);
  });

  if (!game) return;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-500/20 bg-white shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center">
          <div
            className="grid w-full grid-cols-3 items-center"
            style={{ gridTemplateColumns: "1fr auto 1fr" }}
          >
            <div className="flex justify-start">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="text-3xl transform transition-transform duration-300 group-hover:rotate-12">
                  🎲
                </div>
              </Link>
            </div>

            <div className="text-center">
              <span className="text-2xl font-bold text-blue-700 tracking-tight transition-colors group-hover:text-blue-500">
                {game.name}
              </span>
            </div>

            <div className="flex justify-end"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
