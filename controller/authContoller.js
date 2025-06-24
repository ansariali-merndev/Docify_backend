import { checkUser, saveUser } from "../services/authService.js";
import { handleError } from "../utils/util.js";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExist = await checkUser(username);

    if (userExist) {
      return res.json({
        success: false,
        message: "Username is already exist",
      });
    }

    const user = await saveUser(username, password);

    if (user) {
      return res.json({
        success: true,
        message: "working",
      });
    }

    res.json({
      success: false,
      message: "Something went wrong",
    });
  } catch (error) {
    handleError(error, `Auth Register Error: ${error.message}`);
  }
};
