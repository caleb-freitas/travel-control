import { cnpj } from "cpf-cnpj-validator";

import { ICnpjValidator } from "../presentation/protocols/cnpj.validator";

export class CnpjValidatorAdapter implements ICnpjValidator {
  isCnpj(companyCnpj: string): boolean {
    return cnpj.isValid(companyCnpj);
  }
}
