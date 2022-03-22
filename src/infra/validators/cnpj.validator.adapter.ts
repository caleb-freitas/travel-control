import { ICnpjValidator } from "@/presentation/protocols";
import { cnpj } from "cpf-cnpj-validator";

export class CnpjValidatorAdapter implements ICnpjValidator {
  isCnpj(companyCnpj: string): boolean {
    return cnpj.isValid(companyCnpj);
  }
}
