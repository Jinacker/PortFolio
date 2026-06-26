import { useEffect, useState } from "react";

import { motion, useAnimate } from "framer-motion";

import { scene1, scene1Stagger, scene2, scene3at, scene3shape1TotalDuration, scene3shape2Durations as scene3d } from "./constants";

// ㅣ
const SecondShape: React.FC = () => {
  const [scope, animate] = useAnimate();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // scene1
    animate([[".svg1", { y: -10 }, { ...scene1, delay: scene1Stagger }]]);
    // scene2
    animate([[".svg1", { x: 0 }, { ...scene2 }]]);
    // scene3: vertical bar draws in after first shape finishes
    animate([
      [
        ".path1",
        { pathLength: 1 },
        { at: scene3at, delay: scene3shape1TotalDuration, duration: scene3d.pathLength1, ease: "easeInOut", type: "spring" },
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
      <motion.svg
        className="svg1"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        style={{ x: 50, y: 300 }}
      >
        {/* 세로 획 */}
        <motion.path
          className="path1"
          d="M100 50V150"
          stroke="#00C676"
          strokeWidth="72"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={0}
        />
      </motion.svg>
    </motion.div>
  );
};

export default SecondShape;
