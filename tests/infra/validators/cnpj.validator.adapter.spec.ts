import { cnpj } from "cpf-cnpj-validator";

import { CnpjValidatorAdapter } from "../../../src/infra/validators/cnpj.validator.adapter";
import { ICnpjValidator } from "../../../src/presentation/protocols";

interface ISutTypes {
  sut: ICnpjValidator;
}

function makeSut(): ISutTypes {
  const sut = new CnpjValidatorAdapter();
  return { sut };
}

describe("CnpjValidatorAdapter", () => {
  test("should call cpf-cnpj-validator with correct cnpj", () => {
    const { sut } = makeSut();
    const isValidSpy = jest.spyOn(cnpj, "isValid");
    sut.isCnpj("25634428777");
    expect(isValidSpy).toHaveBeenCalledWith("25634428777");
  });

  test("should return false if validator return false", () => {
    const { sut } = makeSut();
    jest.spyOn(cnpj, "isValid").mockReturnValueOnce(false);
    const response = sut.isCnpj("25634428777");
    expect(response).toBe(false);
  });

  test("should return true if validator return true", () => {
    const { sut } = makeSut();
    jest.spyOn(cnpj, "isValid").mockReturnValueOnce(true);
    const response = sut.isCnpj("25634428777");
    expect(response).toBe(true);
  });
});
