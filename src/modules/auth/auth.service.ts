import bcrypt from "bcryptjs";
import { prisma } from "../../config/db";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export async function register(
  name: string,
  email: string,
  age: number,
  password: string
) {
  // check if email is registered or not
  const isExists = await prisma.user.findUnique({
    where: { email },
  });

  if (isExists)
    throw new Error(
      "User already exists with this email! Please login to continue."
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      age,
      password: hashedPassword,
    },
  });

  return { id: user.id, name: user.name, email: user.email, age: user.age };
}

export async function login(email: string, password: string) {
  // check if email is registered or not
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found!");

  // check if password is correct
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error("Invalid credentials!");

  // generate refresh token and save in db
  const refreshToken = generateRefreshToken(user.id);
  const accessToken = generateAccessToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      accessToken,
    },
    refreshToken,
  };
}

export async function logout(id: string) {
  // set refreshtoken null
  await prisma.user.update({
    where: { id },
    data: { refreshToken: null },
  });
}

export async function me(id: string) {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (user)
    return { id: user.id, name: user.name, email: user.email, age: user.age };
}
