import { checkUser, saveUser } from "../services/authService.js";
import {
  comparingPassword,
  handleError,
  setTokenCookie,
} from "../utils/util.js";

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
      setTokenCookie(res, user);
      return res.json({
        success: true,
        message: "created",
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

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExist = await checkUser(username);

    if (!userExist) {
      return res.json({
        success: false,
        message: "Your Credential is wrong",
      });
    }

    const isPasswordMatch = await comparingPassword(
      password,
      userExist.password
    );

    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Your Credential is wrong",
      });
    }

    setTokenCookie(res, userExist);
    res.json({
      success: true,
      message: "You are Logged in successfully",
    });
  } catch (error) {
    handleError(error, `Login Controller Error: ${error.message}`);
  }
};

export const logout = (req, res) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.clearCookie(token, {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 24 * 60 * 60,
    });

    res.json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    handleError(error, `Logout controller Error: ${error.message}`);
  }
};
