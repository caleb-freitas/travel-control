import { IEncrypter, IHashComparer } from "@/data/protocols/cryptography";

export class HashComparerSpy implements IHashComparer {
  plaintext: string;
  digest: string;
  isValid = true;

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.digest = digest;
    return this.isValid;
  }
}

export class EncrypterSpy implements IEncrypter {
  plaintext: string;
  result = "access_token";

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.result;
  }
}
