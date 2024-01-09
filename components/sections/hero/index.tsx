"use client";

import { motion } from "framer-motion";
import { FaStarOfLife } from "react-icons/fa";
import { GiSpring } from "react-icons/gi";
import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import StickerPlanes from "@/components/sticker-planes";

const Hero = () => {
  const [MouseMovement, setMouseMovement] = useState(0);
  const HeroRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <main
      onMouseMove={(e) => {
        setMouseMovement(e);
      }}
      className="w-full flex flex-col px-[5.5rem] bg-cyan-200 bg-[linear-gradient(to_right,#00e1e2_1px,transparent_1px),linear-gradient(to_bottom,#00e1e2_1px,transparent_1px)] bg-[size:4rem_4rem]"
    >
      <section id="hero" ref={HeroRef} className="h-screen w-full relative">
        <StickerPlanes MouseMovement={MouseMovement} />
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 1,
            ease: "easeInOut",
          }}
          className="w-full h-full flex flex-col items-center justify-center gap-5 z-10"
        >
          <h1 className="text-yellow-500 font-bold text-8xl [text-shadow:-3px_-3px_0_#09090b,3px_-3px_0_#09090b,_-3px_3px_0_#09090b,3px_3px_0_#09090b] drop-shadow-[4px_4px_0_#000] ">
            StudyJom!
          </h1>
          <p className="text-black text-lg drop-shadow-md">
            Need to study? Can&apos;t find notes? We got you!
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Hero;
