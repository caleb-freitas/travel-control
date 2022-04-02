import { ICheckCompanyByEmailRepository } from "@/data/protocols";
import { prisma } from "@/infra/database";

export class CheckCompanyByEmailRepository implements ICheckCompanyByEmailRepository {
  async checkEmail(email: string): Promise<boolean> {
    const emailExists = await prisma.company.findFirst({
      where: {
        email,
      },
    });
    return emailExists ? true : false
  }
}
