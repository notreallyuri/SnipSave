import {
  getUserPreferencesController,
  updateUserPreferencesController,
} from "@/modules/user/controllers";
import { NextRequest } from "next/server";

export const GET = getUserPreferencesController
export const PATCH = updateUserPreferencesController;
