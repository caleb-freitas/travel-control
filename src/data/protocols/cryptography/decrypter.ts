import { JwtPayload } from "jsonwebtoken";

export interface IDecrypter {
  decrypt(token: string): Promise<string | JwtPayload>;
}
