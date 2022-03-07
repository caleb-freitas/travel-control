import { cnpj } from "cpf-cnpj-validator";

import { CnpjValidatorAdapter } from "./cnpj.validator.adapter";

describe("CnpjValidatorAdapter", () => {
  test("should call cpf-cnpj-validator with correct cnpj", () => {
    const sut = new CnpjValidatorAdapter();
    const isValidSpy = jest.spyOn(cnpj, "isValid");
    sut.isCnpj("25634428777");
    expect(isValidSpy).toHaveBeenCalledWith("25634428777");
  });
});
