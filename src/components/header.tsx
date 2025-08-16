"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react"; // Используем для симуляции состояния входа

export function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Поменяйте на false, чтобы увидеть кнопку "Войти"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-500/20 bg-white shadow-sm transition-colors duration-300">
      <div className="container flex h-16 max-w-7xl items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-3xl transform transition-transform duration-300 group-hover:rotate-12">
            🎲
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight transition-colors group-hover:text-blue-500">
            Игротека
          </span>
        </Link>

        <nav>
          {isSignedIn ? (
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <AvatarImage src="https://i.pravatar.cc/150" alt="@username" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Войти</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
