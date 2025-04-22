import {
  updateUserController,
  getCurrentUserController,
} from "@/modules/user/controllers";

export const GET = getCurrentUserController;

export const PATCH = updateUserController;
