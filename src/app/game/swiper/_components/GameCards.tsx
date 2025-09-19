/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import GameCard from "./GameCard";

export const easeInExpo = [0.7, 0, 0.84, 0];
export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeInOutExpo = [0.87, 0, 0.13, 1];

const initialDrivenProps = {
  cardWrapperX: 0,
  buttonScaleBadAnswer: 1,
  buttonScaleGoodAnswer: 1,
  mainBgColor: "#000",
};

const words = [
  "Красная шапочка",
  "Крокодил",
  "Чебурашка",
  "Телефон",
  "Самолёт",
  "Компьютер",
  "Пылесос",
  "Ёлка",
  "Морозко",
  "Космонавт",
  "Робот",
  "Шоколад",
  "Зеркало",
  "Снеговик",
  "Бабушка",
  "Дракон",
  "Пират",
  "Принцесса",
  "Учитель",
  "Полицейский",
  "Клоун",
  "Трактор",
  "Рыба",
  "Гитара",
  "Футболист",
];

const GameCards = () => {
  const [user, setUser] = useState({
    score: 0,
    previousScore: 0,
  });
  const [game, setGame] = useState({
    id: 1,
    cards: words.map((word, index) => {
      return {
        id: index,
        affirmation: word,
        answer: "right",
      };
    }),
  });

  const { score } = user;

  const cards = game.cards;

  const [direction, setDirection] = useState<any | "">("");
  const [isDragOffBoundary, setIsDragOffBoundary] = useState(null);
  const [cardDrivenProps, setCardDrivenProps] = useState(initialDrivenProps);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (["left", "right"].includes(direction)) {
      setGame({
        ...game,
        cards: game.cards.slice(0, -1),
      });
      setUser({
        score: 1,
        previousScore: score,
      });
    }

    setDirection("");
  }, [direction]);

  const cardVariants = {
    current: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
    upcoming: {
      opacity: 0.8,
      y: 67,
      scale: 0.9,
      transition: { duration: 0.3, ease: easeOutExpo, delay: 0 },
    },
    remainings: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? -300 : 300,
      y: 40,
      rotate: direction === "left" ? -20 : 20,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  };

  return (
    <motion.div
      className={`flex p-5 min-h-screen h-full flex-col justify-center items-center overflow-hidden  ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={{ backgroundColor: cardDrivenProps.mainBgColor }}
    >
      <Link
        href="/"
        id="close"
        className="absolute top-[20px] right-[20px] w-[30px] h-auto"
      >
        <X className="text-gray-500 w-full h-full" />
      </Link>

      <div
        id="gameUIWrapper"
        className="flex flex-col gap-6 w-full items-center justify-center relative z-10"
      >
        <div
          id="cardsWrapper"
          className="w-full aspect-[100/150] max-w-xs mb-[20px] relative z-10"
        >
          <AnimatePresence>
            {cards.map((card, i) => {
              const isLast = i === cards.length - 1;
              const isUpcoming = i === cards.length - 2;

              if (!isLast && !isUpcoming) {
                return <motion.div key={card.id} style={{ display: "none" }} />;
              }
              return (
                <motion.div
                  key={`card-${i}`}
                  id={`card-${card.id}`}
                  className={`relative `}
                  variants={cardVariants}
                  initial="remainings"
                  animate={
                    isLast ? "current" : isUpcoming ? "upcoming" : "remainings"
                  }
                  exit="exit"
                >
                  <GameCard
                    data={card}
                    id={card.id}
                    setCardDrivenProps={setCardDrivenProps}
                    setIsDragging={setIsDragging}
                    isDragging={isDragging}
                    isLast={isLast}
                    setIsDragOffBoundary={setIsDragOffBoundary}
                    setDirection={setDirection}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCards;
