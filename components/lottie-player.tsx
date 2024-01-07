"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { cn } from "@/lib/common/cn";

export default function LottiePlayer({
  animationData,
  className,
  ...props
}: { animationData: any; className?: string }) {
  return (
    <div className={cn("", className)} {...props}>
      <DotLottiePlayer src={animationData} autoplay loop />
    </div>
  );
}
