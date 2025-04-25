import { UserRepository, IUserRepository } from "./repository";
import {
  GetBaseUserData,
  GetUserByEmail,
  GetUserById,
  UpdateUser,
  UpdateUserPreferences,
  UpdateUserProfilePicture,
} from "./services";
import { GetUserPreferences } from "./services/preferences";

const userFactory = <T>(Service: new (repository: IUserRepository) => T) =>
  new Service(new UserRepository());

const updateUser = userFactory(UpdateUser);
const updateUserProfilePicture = userFactory(UpdateUserProfilePicture);
const getUserByEmail = userFactory(GetUserByEmail);
const getUserById = userFactory(GetUserById);
const getBaseUserData = userFactory(GetBaseUserData);
const getPreferences = userFactory(GetUserPreferences);
const updatePreferences = userFactory(UpdateUserPreferences);

export {
  getUserByEmail,
  getUserById,
  getBaseUserData,
  updateUser,
  getPreferences,
  updatePreferences,
  updateUserProfilePicture,
};
