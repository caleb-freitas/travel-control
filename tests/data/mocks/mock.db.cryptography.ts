import { IHashComparer } from "@/data/protocols/cryptography";

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
