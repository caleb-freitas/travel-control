import { JwtAdapter } from "@/infra/cryptography";
import { throwError } from "@/tests/domain/mocks";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return "any_token";
  },
}));

function makeSut(): JwtAdapter {
  return new JwtAdapter("secret");
}

describe("JwtAdapter", () => {
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
