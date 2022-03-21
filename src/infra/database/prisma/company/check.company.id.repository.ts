import { ICheckCompanyIdRepository } from "../../../../data/protocols/database/company/check.company.id.repository";
import { prisma } from "../prisma.client";

export class CheckCompanyIdRepository implements ICheckCompanyIdRepository {
  async checkId(id: string): Promise<boolean> {
    const company = await prisma.company.findFirst({
      where: {
        id
      }
    })
    if (!company) {
      return false
    }
  }
}