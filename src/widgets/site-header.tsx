"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-blue-100 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 text-3xl font-bold text-blue-600"
        >
          🎲 funtok
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              pathname === "/" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Игры
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              pathname.startsWith("/blog") ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Блог
          </Link>
        </nav>
      </div>
    </header>
  );
}
