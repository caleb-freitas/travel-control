import { ICheckAccountByCnpjRepository } from "../../../../data/protocols/database/check.account.by.cnpj.repository";
import { prisma } from "../prisma.client";

export class CheckAccountByCnpjRepository
  // eslint-disable-next-line prettier/prettier
  implements ICheckAccountByCnpjRepository {
  async checkCnpj(cnpj: string): Promise<boolean> {
    const cnpjExists = await prisma.company.findFirst({
      where: {
        cnpj,
      },
    });
    if (cnpjExists) {
      return true;
    }
    return false;
  }
}
