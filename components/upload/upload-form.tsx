"use client";

import { useState, useRef, ChangeEvent } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { Button } from "@/components/default/button";
import { useMutation } from "@tanstack/react-query";
import { UploadFile } from "@/lib/server/s3";
import toast from "react-hot-toast";

const UploadForm = () => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef(null);

  // upload file mutation
  const uploadFileMutation = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: UploadFile,
  });

  // handle drag events
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files?.[0]);
      toast.promise(uploadFileMutation.mutateAsync(formData), {
        loading: "Uploading...",
        success: "File uploaded successfully!",
        error: "Something went wrong",
      });
    }
  };

  // triggers when file is selected with click
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files?.[0]);
      toast.promise(uploadFileMutation.mutateAsync(formData), {
        loading: "Uploading...",
        success: "File uploaded successfully!",
        error: "Something went wrong",
      });
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    // @ts-ignore
    inputRef.current.click();
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      className="w-full h-1/2 flex items-center justify-center"
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
        className="hidden"
        accept="image/*,application/pdf"
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className="w-1/2 h-full flex items-center justify-center"
      >
        <div className="bg-purple-300 hover:bg-purple-200 w-full h-fit py-10 flex flex-col items-center gap-2 justify-center cursor-pointer shadow-default-md border-2 border-solid border-black rounded-lg">
          <span className="text-5xl text-purple-900">
            <IoCloudUpload />
          </span>
          <p className="text-black text-3xl">Drag and drop files</p>
          <p className="text-purple-900 text-sm">Or if you prefer</p>
          <Button
            type="button"
            onClick={onButtonClick}
            className="bg-cyan-300 hover:bg-cyan-400 active:bg-cyan-500 disabled:bg-cyan-900 cursor-not-allowed"
            disabled={uploadFileMutation.isPending}
          >
            {uploadFileMutation.isPending ? "Uploading..." : "Browse My files"}
          </Button>
          <p className="text-purple-900 text-sm mt-2">
            Supported files: jpg, png, pdf
          </p>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </form>
  );
};

export default UploadForm;
