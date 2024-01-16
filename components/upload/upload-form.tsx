"use client";

import StepOne from "@/components/upload/step-one";
import StepThree from "@/components/upload/step-three";
import StepTwo from "@/components/upload/step-two";
import { useSearchParams } from "next/navigation";

const UploadForm = () => {
  const searchParams = useSearchParams();

  switch (searchParams.get("step") || "1") {
    case "1":
      return <StepOne />;
    case "2":
      return <StepTwo />;
    case "3":
      return <StepThree />;
    default:
      return <StepOne />;
  }
};

export default UploadForm;
