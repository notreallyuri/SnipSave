import { UserRepository, IUserRepository } from "./repository";
import {
  GetBaseUserData,
  GetUserById,
  UpdateUser,
  UpdateUserProfilePicture,
  UpdateUserPreferences,
  GetUserPreferences,
} from "./services";
import { prisma } from "@/lib/prisma";

function userFactory<T>(Service: new (repository: IUserRepository) => T) {
  return new Service(new UserRepository(prisma));
}

const updateUser = userFactory(UpdateUser);
const updateUserProfilePicture = userFactory(UpdateUserProfilePicture);
const getUserById = userFactory(GetUserById);
const getBaseUserData = userFactory(GetBaseUserData);
const getPreferences = userFactory(GetUserPreferences);
const updatePreferences = userFactory(UpdateUserPreferences);

export {
  getUserById,
  getBaseUserData,
  updateUser,
  getPreferences,
  updatePreferences,
  updateUserProfilePicture,
};
