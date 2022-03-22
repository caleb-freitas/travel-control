import { ICheckDriverByEmailRepository } from "../../../../data/protocols/database/driver/check.driver.by.email.repository";
import { prisma } from "../prisma.client";

export class CheckDriverByEmailRepository
  // eslint-disable-next-line prettier/prettier
  implements ICheckDriverByEmailRepository {
  async checkEmail(email: string): Promise<boolean> {
    const emailExists = await prisma.driver.findFirst({
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
