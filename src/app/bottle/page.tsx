"use client";

import { CardGame } from "@/components/card-game";
import { useState } from "react";

const bottles = [
  {
    name: "Винная Бутылка",
    svg: (
      <svg
        width="40"
        height="120"
        viewBox="0 0 40 120"
        className="drop-shadow-2xl transition-transform duration-300 hover:scale-105"
      >
        {/* Тело бутылки */}
        <path
          d="M8 120 L8 45 Q8 40 12 40 L28 40 Q32 40 32 45 L32 120 Q32 125 28 125 L12 125 Q8 125 8 120 Z"
          fill="#2d5016"
          stroke="#1a3009"
          strokeWidth="1"
        />
        {/* Горлышко */}
        <rect
          x="16"
          y="15"
          width="8"
          height="25"
          fill="#2d5016"
          stroke="#1a3009"
          strokeWidth="1"
          rx="2"
        />
        {/* Пробка */}
        <rect
          x="14"
          y="10"
          width="12"
          height="8"
          fill="#8b4513"
          stroke="#654321"
          strokeWidth="1"
          rx="2"
        />
        {/* Этикетка */}
        <rect
          x="10"
          y="60"
          width="20"
          height="25"
          fill="#f8f8f8"
          stroke="#ddd"
          strokeWidth="1"
          rx="2"
        />
        <rect x="12" y="65" width="16" height="3" fill="#8b0000" rx="1" />
        <rect x="12" y="70" width="16" height="2" fill="#333" rx="1" />
        <rect x="12" y="75" width="16" height="2" fill="#333" rx="1" />
      </svg>
    ),
  },
  {
    name: "Пивная Бутылка",
    svg: (
      <svg
        width="35"
        height="120"
        viewBox="0 0 35 120"
        className="drop-shadow-2xl transition-transform duration-300 hover:scale-105"
      >
        {/* Тело */}
        <path
          d="M6 120 L6 50 Q6 45 10 45 L25 45 Q29 45 29 50 L29 120 Q29 125 25 125 L10 125 Q6 125 6 120 Z"
          fill="#8b4513"
          stroke="#654321"
          strokeWidth="1"
        />
        {/* Горлышко */}
        <rect
          x="14"
          y="20"
          width="7"
          height="25"
          fill="#8b4513"
          stroke="#654321"
          strokeWidth="1"
          rx="1"
        />
        {/* Крышка */}
        <rect
          x="12"
          y="15"
          width="11"
          height="8"
          fill="#ffd700"
          stroke="#daa520"
          strokeWidth="1"
          rx="1"
        />
        {/* Этикетка */}
        <rect
          x="8"
          y="65"
          width="19"
          height="30"
          fill="#ff6b35"
          stroke="#e55a2b"
          strokeWidth="1"
          rx="2"
        />
        <circle cx="17.5" cy="75" r="4" fill="#fff" />
        <rect x="10" y="85" width="15" height="2" fill="#fff" rx="1" />
        <rect x="10" y="89" width="15" height="2" fill="#fff" rx="1" />
      </svg>
    ),
  },
  {
    name: "Газировка",
    svg: (
      <svg
        width="38"
        height="120"
        viewBox="0 0 38 120"
        className="drop-shadow-2xl transition-transform duration-300 hover:scale-105"
      >
        {/* Тело */}
        <path
          d="M7 120 L7 55 Q7 50 9 48 L11 45 Q13 40 15 40 L23 40 Q25 40 27 45 L29 48 Q31 50 31 55 L31 120 Q31 125 27 125 L11 125 Q7 125 7 120 Z"
          fill="#228b22"
          stroke="#1e7b1e"
          strokeWidth="1"
          opacity="0.9"
        />
        {/* Горлышко */}
        <rect
          x="16"
          y="18"
          width="6"
          height="22"
          fill="#228b22"
          stroke="#1e7b1e"
          strokeWidth="1"
          rx="1"
        />
        {/* Крышка */}
        <rect
          x="14"
          y="12"
          width="10"
          height="8"
          fill="#dc143c"
          stroke="#b91c3c"
          strokeWidth="1"
          rx="2"
        />
        {/* Этикетка */}
        <ellipse
          cx="19"
          cy="75"
          rx="12"
          ry="20"
          fill="#ff1493"
          stroke="#e1127d"
          strokeWidth="1"
        />
        <text
          x="19"
          y="72"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontWeight="bold"
        >
          COLA
        </text>
        <text x="19" y="82" textAnchor="middle" fill="white" fontSize="6">
          FRESH
        </text>
      </svg>
    ),
  },
  {
    name: "Виски",
    svg: (
      <svg
        width="42"
        height="120"
        viewBox="0 0 42 120"
        className="drop-shadow-2xl transition-transform duration-300 hover:scale-105"
      >
        {/* Тело */}
        <path
          d="M9 120 L9 48 Q9 45 12 45 L30 45 Q33 45 33 48 L33 120 Q33 125 30 125 L12 125 Q9 125 9 120 Z"
          fill="#8b4513"
          stroke="#654321"
          strokeWidth="1"
        />
        {/* Плечо бутылки */}
        <path
          d="M12 45 L12 40 Q12 35 17 35 L25 35 Q30 35 30 40 L30 45"
          fill="#8b4513"
          stroke="#654321"
          strokeWidth="1"
        />
        {/* Горлышко */}
        <rect
          x="17"
          y="15"
          width="8"
          height="20"
          fill="#8b4513"
          stroke="#654321"
          strokeWidth="1"
          rx="1"
        />
        {/* Пробка */}
        <rect
          x="15"
          y="10"
          width="12"
          height="8"
          fill="#daa520"
          stroke="#b8860b"
          strokeWidth="1"
          rx="1"
        />
        {/* Этикетка */}
        <rect
          x="11"
          y="55"
          width="20"
          height="35"
          fill="#f5deb3"
          stroke="#deb887"
          strokeWidth="1"
          rx="2"
        />
        <rect x="13" y="60" width="16" height="4" fill="#8b0000" rx="1" />
        <rect x="13" y="67" width="16" height="2" fill="#333" rx="1" />
        <rect x="13" y="72" width="16" height="2" fill="#333" rx="1" />
        <rect x="13" y="77" width="16" height="2" fill="#333" rx="1" />
        <text
          x="21"
          y="85"
          textAnchor="middle"
          fill="#8b0000"
          fontSize="6"
          fontWeight="bold"
        >
          ВЫДЕРЖКА
        </text>
      </svg>
    ),
  },
  {
    name: "Шампанское",
    svg: (
      <svg
        width="38"
        height="120"
        viewBox="0 0 38 120"
        className="drop-shadow-2xl transition-transform duration-300 hover:scale-105"
      >
        {/* Тело */}
        <path
          d="M7 120 L7 50 Q7 45 11 45 L27 45 Q31 45 31 50 L31 120 Q31 125 27 125 L11 125 Q7 125 7 120 Z"
          fill="#2d4a2d"
          stroke="#1e3a1e"
          strokeWidth="1"
        />
        {/* Горлышко */}
        <rect
          x="15"
          y="25"
          width="8"
          height="20"
          fill="#2d4a2d"
          stroke="#1e3a1e"
          strokeWidth="1"
          rx="1"
        />
        {/* Фольга */}
        <path
          d="M13 25 L13 15 Q13 10 19 10 Q25 10 25 15 L25 25"
          fill="#ffd700"
          stroke="#daa520"
          strokeWidth="1"
        />
        {/* Проволока */}
        <rect
          x="14"
          y="12"
          width="10"
          height="3"
          fill="#c0c0c0"
          stroke="#a0a0a0"
          strokeWidth="1"
        />
        {/* Пробка */}
        <rect
          x="16"
          y="8"
          width="6"
          height="6"
          fill="#8b4513"
          stroke="#654321"
          strokeWidth="1"
          rx="1"
        />
        {/* Элегантная этикетка */}
        <rect
          x="9"
          y="60"
          width="20"
          height="30"
          fill="#f8f8f8"
          stroke="#e0e0e0"
          strokeWidth="1"
          rx="3"
        />
        <rect x="11" y="65" width="16" height="3" fill="#8b0000" rx="1" />
        <text
          x="19"
          y="75"
          textAnchor="middle"
          fill="#8b0000"
          fontSize="4"
          fontWeight="bold"
        >
          ПРЕМИУМ
        </text>
        <text x="19" y="82" textAnchor="middle" fill="#333" fontSize="3">
          ШАМПАНСКОЕ
        </text>
        <rect x="11" y="85" width="16" height="1" fill="#daa520" rx="0.5" />
      </svg>
    ),
  },
];

export default function BottleGame() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedBottle, setSelectedBottle] = useState(0);

  const [duration, setDuration] = useState(0);

  const spinBottle = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const duration = (Math.floor(Math.random() * 4) + 1) * 1000;
    const spins = Math.floor(Math.random() * 5) + 3;
    const finalAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + spins * 360 + finalAngle;

    setRotation(totalRotation);
    setDuration(duration);

    setTimeout(() => {
      setIsSpinning(false);
    }, duration + 0.5);
  };

  return (
    <>
      <CardGame className="grow max-w-md w-full text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 mx-auto self-center">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800 flex items-center justify-center gap-2">
          🍾 Бутылочка
        </h1>

        <div className="mb-24">
          <div className="flex flex-wrap justify-center gap-2">
            {bottles.map((bottle, index) => (
              <button
                key={index}
                onClick={() => setSelectedBottle(index)}
                disabled={isSpinning}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  selectedBottle === index
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"
                }`}
              >
                {bottle.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grow items-start justify-center flex">
          {/* Бутылка */}
          <button
            className="my-auto"
            onClick={spinBottle}
            disabled={isSpinning}
            style={{
              transform: `rotate(${rotation}deg) scale(2.4)`,
              transition: "all",
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: "cubic-bezier(0.5, 0, 0.5, 1)",
              msTransformOrigin: "center center",
            }}
          >
            {bottles[selectedBottle].svg}
          </button>
        </div>

        {/* Статус */}
        <p className="mt-20 text-gray-500 text-sm">
          {isSpinning ? <>&nbsp;</> : "Нажмите на бутылку, чтобы начать!"}
        </p>
      </CardGame>
    </>
  );
}
