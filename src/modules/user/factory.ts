import { UserRepository, IUserRepository } from "./repository";
import {
  GetBaseUserData,
  GetUserByEmail,
  GetUserById,
  UpdateUser,
  UpdateUserPreferences,
} from "./services";
import { GetUserPreferences } from "./services/preferences";

const userFactory = <T>(Service: new (repository: IUserRepository) => T) => {
  return new Service(new UserRepository());
};

const updateUser = userFactory(UpdateUser);
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
};
