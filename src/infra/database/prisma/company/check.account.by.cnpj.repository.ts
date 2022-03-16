import { ICheckCompanyByCnpjRepository } from "../../../../data/protocols/database/company/check.company.by.cnpj.repository";
import { prisma } from "../prisma.client";

export class CheckCompanyByCnpjRepository
  // eslint-disable-next-line prettier/prettier
  implements ICheckCompanyByCnpjRepository {
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
