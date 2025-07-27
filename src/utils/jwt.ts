import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, accessTokenSecret, {
    expiresIn: "1d",
  });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessTokenSecret) as { userId: string };
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshTokenSecret) as { userId: string };
}
