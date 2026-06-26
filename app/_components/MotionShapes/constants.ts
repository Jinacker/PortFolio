import { Easing, Spring } from "framer-motion";

type SpringType = Spring["type"];

export const scene1 = {
  duration: 0.5,
  at: 0.5,
  type: "spring" as SpringType,
  damping: 7,
  bounce: 0.25,
};
export const scene1Stagger = 0.1;

export const scene2 = {
  at: 2,
  duration: 0.5,
  ease: "easeInOut" as Easing,
  type: "spring" as SpringType,
};

export const scene3at = 3;
const getTotalDuration = (obj: { [k in string]: number }) => {
  const durationOffset = 0.5;
  return Object.entries(obj).reduce((acc, cur) => acc + cur[1], 0) - durationOffset;
};

// first shape (ㅈ — horizontal bar drops in + V draws)
export const scene3shape1Durations = {
  moveY1: 0.5,
  pathLength1: 1,
};
export const scene3shape1TotalDuration = getTotalDuration(scene3shape1Durations); // 1.0

// second shape (ㅣ — single vertical stroke)
export const scene3shape2Durations = {
  pathLength1: 0.8,
};
export const scene3shape2TotalDuration = getTotalDuration(scene3shape2Durations); // 0.3

// third shape (ㄴ — L-shape stroke + dot detail)
export const scene3shape3Durations = {
  pathLength1: 1,
  scaleUp1: 0.5,
};

export const jumpOptions = [
  {
    duration: 0.15,
    ease: "easeInOut" as Easing,
  },
  {
    duration: 1,
    ease: "easeInOut" as Easing,
    type: "spring" as SpringType,
    damping: 7,
    bounce: 0.25,
  },
];
