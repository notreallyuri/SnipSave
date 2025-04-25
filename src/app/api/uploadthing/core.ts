import { createUploadthing, type FileRouter } from "uploadthing/next";
import { updateUserProfilePicture } from "@/modules/user";
import { UploadThingError } from "uploadthing/server";
import { getUserBySession } from "@/modules/session";
import { getBaseUserData } from "@/modules/user";

import { UTApi } from "uploadthing/server";

const f = createUploadthing();
const utapi = new UTApi();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await getUserBySession.execute();

      const id = user?.id;

      if (!id) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("✅ File uploaded to:", file.ufsUrl);
      console.log("👤 Uploaded by userId:", metadata.userId);

      const id = metadata.userId;
      const url = file.ufsUrl;

      try {
        await updateUserProfilePicture.execute({ id, url });
      } catch (err) {
        console.error("Failed to update profile picture:", err);
      }

      return { uploadedBy: metadata.userId, fileUrl: url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
