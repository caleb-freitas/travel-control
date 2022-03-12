import { ICheckAccountByEmailRepository } from "../../../../data/protocols/database/check.account.by.email.repository";
import { prisma } from "../prisma.client";

export class CheckAccountByEmailRepository
  // eslint-disable-next-line prettier/prettier
  implements ICheckAccountByEmailRepository {
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
