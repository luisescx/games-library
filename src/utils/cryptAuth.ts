import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

export const generateHashHex = () => randomBytes(32).toString("hex");

export const generatePasswordHash = async (value: string) =>
  bcrypt.hash(value, 8);

export const compareHashPassword = async (
  value: string,
  valueToCompare: string,
) => bcrypt.compare(value, valueToCompare);
