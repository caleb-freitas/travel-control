import { ICheckCompanyByEmailRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class CheckCompanyByEmailRepository implements ICheckCompanyByEmailRepository {
  async checkEmail(email: string): Promise<boolean> {
    const emailExists = await prisma.company.findFirst({
      where: {
        email,
      },
    });
    return !!emailExists;
  }
}
