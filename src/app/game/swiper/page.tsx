"use client";

import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import GameCards from "./_components/GameCards";

export default function SwiperPage() {
  const gameScreenVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
    },
  };
  return (
    <main className="min-h-screen h-full mx-auto bg-gameSwipe-neutral">
      <AnimatePresence mode="wait">
        <motion.div
          key="gameScreen1"
          id="gameScreen"
          variants={gameScreenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <GameCards />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
