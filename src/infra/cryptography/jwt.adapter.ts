import { IDecrypter, IEncrypter } from "@/data/protocols";
import jwt from "jsonwebtoken";

/* Class representing an adapter to jsonwebtoken package */
export class JwtAdapter implements IEncrypter, IDecrypter {
  /**
   * Initialize the secret variable (md5 hash)
   * @param secret - private application key to create a json web token
   */
  constructor(private readonly secret: string) {}

  /**
   * Responsible for encrypting a string
   *
   * @param  plaintext - the payload (plaintext) to be encrypted. usually, the account id
   * @returns the json web token as string
   */
  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret);
  }

  /**
   * Responsible for decrypting a json web token
   *
   * @param token - the encoded json web token
   * @returns the payload decoded if the signature is valid
   */
  async decrypt(token: string): Promise<string> {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) return null;
    return jwt.verify(token, this.secret) as any;
  }
}
