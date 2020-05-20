import bcrypt from "bcrypt";
import { isUserExist, addUser } from "./user-repository";
export const createUserWithEncryptPassword = async (user) => {
  const salt = await bcrypt.genSalt();
  const cryptedPassword = await bcrypt.hash(user.password, salt);
  user.password = cryptedPassword;
  return user;
};
export const saveUser = async (user) => {
  let isExist = await isUserExist(user.name);
  if (!isExist) {
    let userWithEncryptedPassword = await createUserWithEncryptPassword(user);
    addUser(userWithEncryptedPassword);
    return userWithEncryptedPassword;
  } else return null;
};
