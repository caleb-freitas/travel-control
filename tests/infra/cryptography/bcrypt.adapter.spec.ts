import { BcryptAdapter } from "@/infra/cryptography";
import bcrypt from "bcrypt";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
  async compare(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  },
}));

const salt = 12;

describe("BcryptAdapter", () => {
  test("should call bcrypt with correct values", async () => {
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.hash("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("should throw if hash method throw", async () => {
    const sut = new BcryptAdapter(salt);
    jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.hash("any_value");
    expect(promise).rejects.toThrow();
  });

  test("should return a hash on hash success", async () => {
    const sut = new BcryptAdapter(salt);
    const hash = await sut.hash("any_value");
    expect(hash).toBe("hash");
  });

  test("should return true if compare return true", async () => {
    const sut = new BcryptAdapter(salt);
    const isValid = await sut.compare("plaintext", "digest");
    expect(isValid).toBe(true);
  });

  test("should return false if compare return false", async () => {
    const sut = new BcryptAdapter(salt);
    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(false));
    });
    const isValid = await sut.compare("plaintext", "digest");
    expect(isValid).toBe(false);
  });

  test("should throw if compare method throw", async () => {
    const sut = new BcryptAdapter(salt);
    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.compare("plaintext", "digest");
    expect(promise).rejects.toThrow();
  });
});
