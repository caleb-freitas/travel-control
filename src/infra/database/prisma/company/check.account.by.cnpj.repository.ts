import { ICheckCompanyByCnpjRepository } from "@/data/protocols";
import { prisma } from "@/infra/database";

export class CheckCompanyByCnpjRepository implements ICheckCompanyByCnpjRepository {
  async checkCnpj(cnpj: string): Promise<boolean> {
    const cnpjExists = await prisma.company.findFirst({
      where: {
        cnpj,
      },
    });
    return cnpjExists ? true : false
  }
}
