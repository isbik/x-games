import { useRef, useEffect } from "react";

export const useEndTimer = (count: number) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current === null) {
      audioRef.current = new window.Audio("/assets/end-timer.wav");
    }

    if (Math.floor(count) === 3) {
      audioRef.current?.play();
    }
  }, [count]);
};
