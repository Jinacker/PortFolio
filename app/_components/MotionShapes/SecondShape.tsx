import { useEffect, useState } from "react";

import { motion, useAnimate } from "framer-motion";

import {
  scene1,
  scene2,
  scene3at,
  scene3shape2Durations as scene3d,
  scene3shape1TotalDuration,
  scene1Stagger,
} from "./constants";

const SecondShape: React.FC = () => {
  const [scope, animate] = useAnimate();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // scene1
    animate([[".svg1", { y: -10 }, { ...scene1, delay: scene1Stagger }]]);
    // scene2
    animate([[".svg1", { x: 0 }, { ...scene2 }]]);
    // scene3
    animate([
      [
        ".path1",
        { y: 0 },
        { at: scene3at, delay: scene3shape1TotalDuration, duration: scene3d.moveY1, ease: "easeOut", type: "spring" },
      ],
      [".path1", { pathLength: 1 }, { duration: scene3d.pathLength1, ease: "easeInOut", type: "spring" }],
    ]);
    animate([
      [
        ".path2",
        { pathLength: 1 },
        {
          at: scene3at,
          delay: scene3shape1TotalDuration + scene3d.moveY1,
          duration: scene3d.pathLength1,
          ease: "easeInOut",
          type: "spring",
        },
      ],
    ]).then(() => setIsDone(true));
  }, [animate]);

  return (
    <motion.div
      ref={scope}
      style={{ width: "fit-content", zIndex: 2 }}
      whileHover={isDone ? { y: -30 } : undefined}
      whileTap={isDone ? { scale: 0.9 } : undefined}
      transition={{ duration: 0.1, type: "spring", damping: 7, bounce: 0.25 }}
    >
      <motion.svg className="svg1" width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ x: 50, y: 300 }}>
        <motion.path
          className="path1"
          d="M50 57H150"
          stroke="#00C676"
          strokeWidth="72"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={0}
          style={{ y: 86 }}
        />
        <motion.path
          className="path2"
          d="M50 143L100 93L150 143"
          stroke="#00C676"
          strokeWidth="72"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={0.001}
        />
      </motion.svg>
    </motion.div>
  );
};

export default SecondShape;
