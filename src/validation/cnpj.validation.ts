import { InvalidParamError } from "@/presentation/errors";
import { ICnpjValidator, IValidation } from "@/presentation/protocols";

export class CnpjValidation implements IValidation {
  constructor(
    private readonly cnpj: string,
    private readonly cnpjValidator: ICnpjValidator
  ) {}

  validate(input: any): Error {
    const validCnpj = this.cnpjValidator.isCnpj(input[this.cnpj]);
    if (!validCnpj) {
      return new InvalidParamError(this.cnpj);
    }
  }
}
