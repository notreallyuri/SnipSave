import { AppError } from "@/lib/errors";
import crypto from "crypto";

export const utility = {
  hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
        if (error) reject(error);

        resolve(hash.toString("hex").normalize());
      });
    });
  },

  generateSalt() {
    return crypto.randomBytes(16).toString("hex").normalize();
  },

  async verifyPassword(password: string, salt: string, hashedPassword: string) {
    const inputHashed = await this.hashPassword(password, salt);

    return crypto.timingSafeEqual(
      Buffer.from(inputHashed, "hex"),
      Buffer.from(hashedPassword, "hex"),
    );
  },
};
