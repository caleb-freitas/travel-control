import { ICheckCompanyIdRepository } from "@/data/protocols";
import { prisma } from "@/infra/database";

export class CheckCompanyIdRepository implements ICheckCompanyIdRepository {
  async checkId(id: string): Promise<boolean> {
    const companyExists = await prisma.company.findFirst({
      where: {
        id
      }
    })
    return companyExists ? true : false
  }
}