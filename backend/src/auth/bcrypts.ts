import bcryptjs from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(12);

  return await bcryptjs.hash(password, salt);
}

export async function compareHash(
  password: string,
  hashed: string
): Promise<boolean> {
  return await bcryptjs.compare(password, hashed);
}
