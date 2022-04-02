import { ICheckDriverByEmailRepository } from "@/data/protocols";
import { prisma } from "@/infra/database";


export class CheckDriverByEmailRepository implements ICheckDriverByEmailRepository {
  async checkEmail(email: string): Promise<boolean> {
    const emailExists = await prisma.driver.findFirst({
      where: {
        email,
      },
    });
    return emailExists ? true : false
  }
}
