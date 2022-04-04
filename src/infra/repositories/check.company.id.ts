import { ICheckCompanyIdRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

export class CheckCompanyIdRepository implements ICheckCompanyIdRepository {
  async checkId(id: string): Promise<boolean> {
    const companyExists = await prisma.company.findFirst({
      where: {
        id,
      },
    });
    return !!companyExists;
  }
}
