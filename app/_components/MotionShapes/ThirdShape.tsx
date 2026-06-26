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

// ㄴ
const ThirdShape = () => {
  const [scope, animate] = useAnimate();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // scene1
    animate([[".svg1", { y: -10 }, { ...scene1, delay: scene1Stagger * 2 }]]);
    // scene2
    animate([[".svg1", { x: 0 }, { ...scene2 }]]);
    // scene3: L-shape draws in after second shape finishes, then dot pops
    animate([
      [
        ".path1",
        { pathLength: 1 },
        {
          at: scene3at,
          delay: scene3shape1TotalDuration + scene3shape2TotalDuration,
          duration: scene3d.pathLength1,
          ease: "easeOut",
          type: "spring",
        },
      ],
      [".dot", { scale: 1 }, { duration: scene3d.scaleUp1, at: "-0.2", ease: "easeOut", type: "spring", bounce: 0.5 }],
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
        {/* ㄴ: 위에서 내려와 오른쪽으로 꺾임 */}
        <motion.path
          className="path1"
          d="M55 50L55 143L150 143"
          stroke="#fde047"
          strokeWidth="72"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={0}
        />
        {/* 꺾이는 모서리 안쪽 흰 점 디테일 */}
        <motion.circle
          className="dot dark:fill-background"
          cx={130}
          cy={143}
          r={14}
          fill="#ffffff"
          style={{ originX: "130px", originY: "143px" }}
          scale={0}
        />
      </motion.svg>
    </motion.div>
  );
};

export default ThirdShape;
