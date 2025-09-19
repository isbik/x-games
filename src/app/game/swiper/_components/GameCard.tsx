/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dispatch, SetStateAction, useState } from "react";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

type Props = {
  id?: number;
  data: any;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  isLast: boolean;
  setIsDragOffBoundary: Dispatch<SetStateAction<any>>;
  setDirection: Dispatch<SetStateAction<any>>;
};

const GameCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  isLast,
  setIsDragOffBoundary,
  setDirection,
}: Props) => {
  const [imgLoadingComplete, setImgLoadingComplete] = useState(false);

  const { affirmation, illustration } = data;
  const x = useMotionValue(0);

  const scoreVariants = {
    initial: {
      y: 0,
    },
    pop: {
      y: [0, -15, -20, -15, 0],
    },
  };

  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-400, 0, 400];
  const outputY = [120, 0, 120];
  const outputRotate = [-20, 0, 20];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];
  const outputMainBgColor = ["#fcbab6", "#111", "#D4E0B2"];

  const drivenX = useTransform(x, inputX, outputX);
  const drivenY = useTransform(x, inputX, outputY);
  const drivenRotation = useTransform(x, inputX, outputRotate);
  const drivenActionLeftScale = useTransform(
    x,
    inputX,
    outputActionScaleBadAnswer
  );
  const drivenActionRightScale = useTransform(
    x,
    inputX,
    outputActionScaleRightAnswer
  );
  const drivenBg = useTransform(x, [-20, 0, 20], outputMainBgColor);

  useMotionValueEvent(x, "change", (latest) => {
    // @ts-ignore
    setCardDrivenProps((state) => ({
      ...state,
      cardWrapperX: latest,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }));
  });

  return (
    <>
      <motion.div
        id={`cardDrivenWrapper-${id}`}
        className="absolute bg-white p-8 rounded-lg text-center w-full aspect-[100/150] pointer-events-none text-black origin-bottom select-none border-2 border-gray-500"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <div
          id="metrics"
          className="flex w-full justify-between items-baseline"
        >
          <div className="text-gray-500">
            <span className="text-[62px] leading-none">{id}</span>
          </div>
          <div id="score" className="flex relative">
            <div className="text-[50px] text-grey-500 leading-none relative">
              <motion.div
                id="scoreValue"
                className="relative"
                variants={scoreVariants}
                initial="initial"
                transition={{
                  stiffness: 2000,
                  damping: 5,
                }}
              >
                1
              </motion.div>
            </div>
          </div>
        </div>
        <div
          id="illustration"
          className="w-full mx-auto max-w-[250px] aspect-square rounded-full relative"
        >
          <div
            id="imgPlaceholder"
            className="bg-gameSwipe-neutral absolute object-cover w-full h-full"
            style={{
              maskImage: `url('/images/gamecard-image-mask.png')`,
              WebkitMaskImage: `url(/images/gamecard-image-mask.png)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          ></div>
          <img
            className={`absolute object-cover object-center ${
              imgLoadingComplete ? "opacity-100" : "opacity-0"
            } duration-500 ease-out`}
            src={`/images/games/game-0-card-${illustration}.jpg`}
            sizes={`(max-width: 768px) 100vw, 250px`}
            alt="car"
            style={{
              maskImage: `url('/images/gamecard-image-mask.png')`,
              WebkitMaskImage: `url(/images/gamecard-image-mask.png)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>
        <p id="affirmation" className="mt-2 text-[20px] leading-tight">
          {affirmation}
        </p>
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute w-full aspect-[100/150] ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.2}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          const offset = info.offset.x;

          if (offset < 0 && offset < offsetBoundary * -1) {
            setIsDragOffBoundary("left");
          } else if (offset > 0 && offset > offsetBoundary) {
            setIsDragOffBoundary("right");
          } else {
            setIsDragOffBoundary(null);
          }
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setIsDragOffBoundary(null);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";

          if (isOffBoundary) {
            setDirection(direction);
          }
        }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default GameCard;
