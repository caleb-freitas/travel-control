import { ICheckCompanyByCnpjRepository } from "@/data/protocols";
import { prisma } from "../prisma.client";

export class CheckCompanyByCnpjRepository implements ICheckCompanyByCnpjRepository {
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
