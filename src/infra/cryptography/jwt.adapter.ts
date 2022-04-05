import { IEncrypter } from "@/data/protocols";
import jwt from "jsonwebtoken";

export class JwtAdapter implements IEncrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret);
  }
}
