import { hash, verify } from "@node-rs/argon2";

// Configuration for password hashing
const hashingOptions = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

/**
 * Hashes a plaintext password using Argon2 with predefined options.
 *
 * @param {string} password - The plaintext password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  console.log(password);
  if (!password) {
    throw new Error("Password is required to hash.");
  }
  const hashedPass = await hash(password, hashingOptions);
  console.log(hashedPass);
  return hashedPass;
};

/**
 * Verifies a plaintext password against a hashed password.
 *
 * @param {string} dbPassword - The hashed password from the database.
 * @param {string} formPassword - The plaintext password to verify.
 * @returns {Promise<boolean>} - Whether the password is valid.
 */
export const verifyPassword = async (
  dbPassword: string,
  formPassword: string,
  options?: object
): Promise<boolean> => {
  if (!dbPassword || !formPassword) {
    throw new Error("Both hashed and plaintext passwords are required.");
  }
  return verify(dbPassword, formPassword, hashingOptions);
};
