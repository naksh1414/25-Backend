import jwt from "jsonwebtoken";
interface UserPayload {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export const generateToken = (user:UserPayload): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "24h" }
  );
};
