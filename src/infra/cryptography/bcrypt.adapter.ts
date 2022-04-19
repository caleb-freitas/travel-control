import { IHasher, IHashComparer } from "@/data/protocols/cryptography";
import bcrypt from "bcrypt";

/* Class representing an adapter to Bcrypt package */
export class BcryptAdapter implements IHasher, IHashComparer {
  /**
   * Initialize the salt variable. The pattern in this application is salt = 12
   *
   * @param salt - number of rounds to generate the salt. salt is a random data of a hash function to guarantee a unique output
   */
  constructor(private readonly salt: number) {}

  /**
   * Responsible for creating a hash from a string
   *
   * @param plaintext - the string to be hashed
   * @returns the hashed string
   */
  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }

  /**
   * Responsible for compare a given string with a hashed string
   *
   * @param plaintext - string provided to be compared with a hashed string
   * @param digest - hashed string
   * @returns a boolean informing if the strings are the same or not
   */
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
