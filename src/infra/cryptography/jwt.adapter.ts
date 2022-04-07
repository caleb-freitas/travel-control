import { IDecrypter, IEncrypter } from "@/data/protocols";
import jwt, { JwtPayload } from "jsonwebtoken";

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret);
  }
  async decrypt(token: string): Promise<string | JwtPayload> {
    return jwt.verify(token, this.secret);
  }
}
