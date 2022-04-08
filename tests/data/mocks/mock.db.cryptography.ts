import {
  IEncrypter,
  IHashComparer,
  IDecrypter,
  IHasher,
} from "@/data/protocols/cryptography";

export class HashComparerSpy implements IHashComparer {
  isValid: boolean;
  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.isValid = true;
    return new Promise((resolve) => resolve(this.isValid));
  }
}

export class HasherSpy implements IHasher {
  hashed: string;
  async hash(value: string): Promise<string> {
    this.hashed = "hashed_password";
    return new Promise((resolve) => resolve(this.hashed));
  }
}

export class EncrypterSpy implements IEncrypter {
  token: string;
  async encrypt(plaintext: string): Promise<string> {
    this.token = "access_token";
    return new Promise((resolve) => resolve(this.token));
  }
}

export class DecrypterSpy implements IDecrypter {
  result: string;
  async decrypt(token: string): Promise<string> {
    this.result = "any_value";
    return new Promise((resolve) => resolve(this.result));
  }
}
