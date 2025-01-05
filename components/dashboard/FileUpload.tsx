"use client";

import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { toast } from "sonner";

interface FileUploadProps {
  onStatusChange: (status: "idle" | "processing" | "complete") => void;
}

export function FileUpload({ onStatusChange }: FileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;
    
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please upload a PDF file");
      return;
    }

    try {
      setIsUploading(true);
      onStatusChange("processing");

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 5000));

      clearInterval(interval);
      setUploadProgress(100);
      onStatusChange("complete");
      toast.success("File processed successfully");
    } catch (error) {
      toast.error("Error processing file");
      onStatusChange("idle");
    } finally {
      setIsUploading(false);
    }
  }, [onStatusChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 px-5 py-5 text-center transition-colors hover:bg-muted/80 ${
          isDragActive ? "border-primary" : ""
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-10 w-10 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag & drop your bank statement PDF here, or click to select
        </p>
        <Button
          variant="secondary"
          className="mt-4"
          disabled={isUploading}
        >
          Select File
        </Button>
      </div>

      {isUploading && (
        <div className="mt-4">
          <Progress value={uploadProgress} className="h-2 w-full" />
          <p className="mt-2 text-sm text-muted-foreground">
            Processing your statement...
          </p>
        </div>
      )}
    </div>
  );
}