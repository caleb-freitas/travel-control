import { ICheckCompanyByEmailRepository } from "../../../../data/protocols/database/check.company.by.email.repository";
import { prisma } from "../prisma.client";

export class CheckCompanyByEmailRepository
  // eslint-disable-next-line prettier/prettier
  implements ICheckCompanyByEmailRepository {
  async checkEmail(email: string): Promise<boolean> {
    const emailExists = await prisma.company.findFirst({
      where: {
        email,
      },
    });
    if (emailExists) {
      return true;
    }
    return false;
  }
}
