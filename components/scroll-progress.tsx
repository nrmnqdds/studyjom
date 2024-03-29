"use client";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        background: "#FF007F",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "10px",
        transformOrigin: "0%",
        zIndex: 9999,
      }}
    />
  );
}
