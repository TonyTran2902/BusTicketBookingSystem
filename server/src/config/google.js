import { OAuth2Client } from "google-auth-library";

export const buildGoogleClient = (clientId) => {
  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID missing");
  }
  return new OAuth2Client(clientId);
};

export const verifyGoogleToken = async (client, token, audience) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience,
  });
  const payload = ticket.getPayload();
  return {
    googleId: payload?.sub,
    email: payload?.email,
    name: payload?.name,
    picture: payload?.picture,
    emailVerified: payload?.email_verified,
  };
};
