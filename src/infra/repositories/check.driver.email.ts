import { ICheckDriverByEmailRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class CheckDriverByEmailRepository implements ICheckDriverByEmailRepository {
  async checkEmail(email: string): Promise<boolean> {
    const emailExists = await prisma.driver.findFirst({
      where: {
        email,
      },
    });
    // eslint-disable-next-line no-unneeded-ternary
    return emailExists ? true : false;
  }
}
