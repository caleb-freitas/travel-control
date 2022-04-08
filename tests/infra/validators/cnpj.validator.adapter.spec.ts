import { cnpjValidatorSut } from "@/tests/infra/validators/sut";
import { cnpj } from "cpf-cnpj-validator";

describe("CnpjValidatorAdapter", () => {
  test("should call cpf-cnpj-validator with correct cnpj", () => {
    const { sut } = cnpjValidatorSut();
    const isValidSpy = jest.spyOn(cnpj, "isValid");
    sut.isCnpj("25634428777");
    expect(isValidSpy).toHaveBeenCalledWith("25634428777");
  });

  test("should return false if validator return false", () => {
    const { sut } = cnpjValidatorSut();
    jest.spyOn(cnpj, "isValid").mockReturnValueOnce(false);
    const response = sut.isCnpj("25634428777");
    expect(response).toBe(false);
  });

  test("should return true if validator return true", () => {
    const { sut } = cnpjValidatorSut();
    jest.spyOn(cnpj, "isValid").mockReturnValueOnce(true);
    const response = sut.isCnpj("25634428777");
    expect(response).toBe(true);
  });
});
