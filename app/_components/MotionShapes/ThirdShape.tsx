import { useEffect, useState } from "react";

import { motion, useAnimate } from "framer-motion";

import {
  scene1,
  scene1Stagger,
  scene2,
  scene3at,
  scene3shape1TotalDuration,
  scene3shape2TotalDuration,
  scene3shape3Durations as scene3d,
} from "./constants";

const ThirdShape = () => {
  const [scope, animate] = useAnimate();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // scene1
    animate([[".svg1", { y: -10 }, { ...scene1, delay: scene1Stagger * 2 }]]);
    // scene2
    animate([[".svg1", { x: 0 }, { ...scene2 }]]);
    // scene3
    animate([
      [
        ".path1",
        { x: 0 },
        {
          duration: scene3d.moveX1,
          at: scene3at,
          delay: scene3shape1TotalDuration + scene3shape2TotalDuration,
          ease: "easeOut",
          type: "spring",
        },
      ],
      [".path1", { pathLength: 1 }, { duration: scene3d.pathLength1, at: "-0.3", ease: "easeOut", type: "spring" }],
      [".path2", { scale: 1 }, { duration: scene3d.scaleUp1, at: "-0.2", ease: "easeOut", type: "spring" }],
    ]).then(() => setIsDone(true));
  }, []);

  return (
    <motion.div
      ref={scope}
      style={{ width: "fit-content", zIndex: 1 }}
      whileHover={isDone ? { y: -30 } : undefined}
      whileTap={isDone ? { scale: 0.9 } : undefined}
      transition={{ duration: 0.1, type: "spring", damping: 7, bounce: 0.25 }}
    >
      <motion.svg
        className="svg1"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        style={{ x: -150, y: 300 }}
      >
        <motion.path
          className="path1"
          d="M100 144C75.6995 144 56 124.301 56 100C56 75.6995 75.6995 56 100 56C124.301 56 144 75.6995 144 100C144 124.301 124.301 144 100 144Z"
          stroke="#E2FF00"
          strokeWidth="72"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={0}
          x={-50}
        />
        <motion.path
          className="path2 dark:fill-background"
          d="M86 143C86 162.882 69.8823 179 50 179C30.1177 179 14 162.882 14 143C14 123.118 30.1177 107 50 107C69.8823 107 86 123.118 86 143Z"
          fill="#ffffff"
          scale={0}
        />
      </motion.svg>
    </motion.div>
  );
};

export default ThirdShape;
