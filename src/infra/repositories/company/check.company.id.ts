import { ICheckCompanyByIdRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

export class CheckCompanyByIdRepository implements ICheckCompanyByIdRepository {
  async checkId(id: string): Promise<boolean> {
    const companyExists = await prisma.company.findFirst({
      where: {
        id,
      },
    });
    return !!companyExists;
  }
}
