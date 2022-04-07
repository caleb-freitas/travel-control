import { JwtAdapter } from "@/infra/cryptography";
import { throwError } from "@/tests/domain/mocks";
import jwt, { verify } from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return "any_token";
  },
  async verify(): Promise<string> {
    return "any_value";
  },
}));

function makeSut(): JwtAdapter {
  return new JwtAdapter("secret");
}

describe("JwtAdapter", () => {
  describe("sign()", () => {
    test("should call sign with correct values", async () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, "sign");
      await sut.encrypt("any_id");
      expect(signSpy).toHaveBeenCalledWith({ id: "any_id" }, "secret");
    });

    test("should throw if sign throw", async () => {
      const sut = makeSut();
      jest.spyOn(jwt, "sign").mockImplementationOnce(throwError);
      const promise = sut.encrypt("any_id");
      await expect(promise).rejects.toThrow();
    });

    test("should return a token on success", async () => {
      const sut = makeSut();
      const token = await sut.encrypt("any_id");
      expect(token).toBe("any_token");
    });
  });
  describe("verify()", () => {
    test("should call verify with correct values", async () => {
      const sut = makeSut();
      const verifySpy = jest.spyOn(jwt, "verify");
      await sut.decrypt("any_token");
      expect(verifySpy).toHaveBeenCalledWith("any_token", "secret");
    });

    test("should throw if verify throw", async () => {
      const sut = makeSut();
      jest.spyOn(jwt, "verify").mockImplementationOnce(throwError);
      const promise = sut.decrypt("any_token");
      await expect(promise).rejects.toThrow();
    });

    test("should return a value on success", async () => {
      const sut = makeSut();
      const token = await sut.decrypt("any_token");
      expect(token).toBe("any_value");
    });
  });
});
