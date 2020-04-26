import { UserModel } from "./user-schema";

export const isUserExist = async (username) => {
  return UserModel.exists({ name: username });
};

export const getPasswordByUsername = async (username) => {
  return await UserModel.findOne(
    { name: username },
    { password: 1, _id: 0 }
  ).then((value) => {
    if (value) return value.password;
    else return null;
  });
};

export const addUser = (user) => {
  UserModel.create(user, (error) => {
    if (error) console.log(error);
  });
};
