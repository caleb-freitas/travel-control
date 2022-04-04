import { ICheckDriverByEmailRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

export class CheckDriverByEmailRepository
  // eslint-disable-next-line prettier/prettier
  implements ICheckDriverByEmailRepository {
  async checkEmail(email: string): Promise<boolean> {
    const emailExists = await prisma.driver.findFirst({
      where: {
        email,
      },
    });
    return !!emailExists;
  }
}
