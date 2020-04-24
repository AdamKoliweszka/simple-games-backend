import { UserModel } from "./user-schema";

export const isUserExist = async (username) => {
  return UserModel.exists({ name: username });
};

export const addUser = (user) => {
  UserModel.create(user, (error) => {
    console.log(error);
  });
};
