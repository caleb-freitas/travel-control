import { BcryptAdapter } from "@/infra/cryptography";
import bcrypt from "bcrypt";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
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

  test("should throw if bcrypt throw", async () => {
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
});
