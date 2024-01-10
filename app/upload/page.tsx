import Navbar from "@/components/upload/navbar";
import UploadForm from "@/components/upload/upload-form";
import React from "react";

const Page = () => {
  return (
    <main className="bg-indigo-300 w-full h-screen flex items-center justify-center">
      <Navbar />
      <UploadForm />
    </main>
  );
};

export default Page;
