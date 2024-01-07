"use client";

import { motion } from "framer-motion";
import { FaStarOfLife } from "react-icons/fa";
import { GiSpring } from "react-icons/gi";

const Hero = () => {
  return (
    <section id="hero" className="h-screen w-full relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-cyan-200 bg-[linear-gradient(to_right,#00e1e2_1px,transparent_1px),linear-gradient(to_bottom,#00e1e2_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <motion.span
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-20px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="absolute text-green-300 drop-shadow-[4px_4px_0_#000] top-[100px] left-[300px] text-[300px]"
      >
        <FaStarOfLife />
      </motion.span>

      <motion.span
        initial={{
          transform: "translateZ(8px) translateY(-30px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-10px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="absolute text-gray-300 drop-shadow-[4px_4px_0_#000] bottom-[100px] right-[300px] text-[500px]"
      >
        <GiSpring />
      </motion.span>
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
  );
};

export default Hero;
