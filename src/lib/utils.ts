import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const customHasher = {
  hash(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
        if (error) return reject(error);

        resolve(hash.toString("hex").normalize());
      });
    });
  },

  generateSalt() {
    return crypto.randomBytes(16).toString("hex").normalize();
  },

  async verify(password: string, salt: string, hashedPassword: string) {
    const inputHashed = await this.hash(password, salt);

    return crypto.timingSafeEqual(
      Buffer.from(inputHashed, "hex"),
      Buffer.from(hashedPassword, "hex"),
    );
  },
};
