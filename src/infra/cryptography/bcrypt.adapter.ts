import { IHasher } from "@/data/protocols/cryptography/hasher";
import bcrypt from "bcrypt";

export class BcryptAdapter implements IHasher {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }
}