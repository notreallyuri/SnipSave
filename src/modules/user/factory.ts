import { UserRepository, IUserRepository } from "./repository";
import {
  GetBaseUserData,
  GetUserById,
  UpdateUser,
  UpdateUserProfilePicture,
  UpdateUserPreferences,
  GetUserPreferences,
} from "./services";

const userFactory = <T>(Service: new (repository: IUserRepository) => T) =>
  new Service(new UserRepository());

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
