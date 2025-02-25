import { useEffect } from "react";

export const useEndTimer = (count: number) => {
  const audio = new Audio("/assets/end-timer.wav");

  useEffect(() => {
    if (Math.floor(count) === 3) {
      audio.play();
    }
  }, [count]);
};
