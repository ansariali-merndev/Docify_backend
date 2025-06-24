import { UserDB } from "../model/authRegister.js";
import { handleError, hashingPassword } from "../utils/util.js";

export const checkUser = async (username) => await UserDB.findOne({ username });

export const saveUser = async (username, password) => {
  try {
    const hashedPass = await hashingPassword(password);
    const user = new UserDB({
      username,
      password: hashedPass,
    });

    await user.save();
    return user;
  } catch (error) {
    handleError(error, `SaveUser error services: ${error.message}`);
  }
};
