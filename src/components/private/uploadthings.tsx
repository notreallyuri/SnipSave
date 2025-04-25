"use client";

import { generateUploadButton } from "@uploadthing/react";
import { useGetBaseUserData } from "@/hooks/fetch";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { cn } from "@/lib/utils";
import Image from "next/image";

const UploadButton = generateUploadButton<OurFileRouter>();

export function UploadPFP() {
  const { data: user } = useGetBaseUserData();

  const imageUrl = (user?.image as string) || undefined;

  return (
    <div className="group relative size-32 overflow-hidden">
      <div
        className={cn(
          "size-full overflow-hidden rounded-full border border-gray-300 bg-gray-200",
          "flex cursor-pointer items-center justify-center transition-shadow duration-200",
          "hover:ring-primary hover:ring-2",
        )}
      >
        {imageUrl ? (
          <Image
            fill
            src={imageUrl}
            alt="Profile Picture"
            className="object-cover"
          />
        ) : (
          <span className="text-gray-500">No photo</span>
        )}
      </div>

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white",
          "opacity-0 transition-opacity group-hover:opacity-100",
        )}
      >
        Upload profile picture
      </div>

      <div className="absolute inset-0">
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            button: "size-full opacity-0 cursor-pointer",
            container: "size-full",
          }}
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
          }}
        />
      </div>
    </div>
  );
}
