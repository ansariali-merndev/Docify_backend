import passport from "passport";
import { Strategy } from "passport-google-oauth20";

export const googlePassportStrategy = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("access token: ", accessToken);
          console.log("refreshToken: ", refreshToken);
          console.log("Profile: ", profile);
          return done(null, profile);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};
