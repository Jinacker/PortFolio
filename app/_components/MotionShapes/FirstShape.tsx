import { useEffect, useState } from "react";

import { motion, useAnimate } from "framer-motion";

import { scene1, scene2, scene3at, scene3shape1Durations as scene3d } from "./constants";

const FirstShape = () => {
  const [scope, animate] = useAnimate();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // scene1
    animate([[".svg1", { y: -10 }, { ...scene1 }]]);
    // scene2
    animate([[".svg1", { x: 0 }, { ...scene2 }]]);
    // scene3
    animate([
      [".path1", { pathLength: 1 }, { at: scene3at, duration: scene3d.pathLength1, ease: "easeOut", type: "spring" }],
    ]).then(() => setIsDone(true));
  }, []);

  return (
    <motion.div
      ref={scope}
      style={{ width: "fit-content", zIndex: 3 }}
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
        xmlns="http://www.w3.org/2000/svg"
        style={{ x: 250, y: 300 }}
      >
        <motion.path
          className="path1"
          d="M 50 140.5 L 100 64 L 150 140.5"
          stroke="#007AFF"
          strokeWidth="72"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={0}
          visibility="visible"
        />
      </motion.svg>
    </motion.div>
  );
};

export default FirstShape;
