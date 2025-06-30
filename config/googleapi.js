import { google } from "googleapis";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const googleAuth = () => {
  console.log(CLIENT_ID);
  console.log(CLIENT_SECRET);
  return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, "postmessage");
};
