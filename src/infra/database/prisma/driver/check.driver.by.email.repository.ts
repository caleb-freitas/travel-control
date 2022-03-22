import { ICheckDriverByEmailRepository } from "@/data/protocols";
import { prisma } from "../prisma.client";

export class CheckDriverByEmailRepository implements ICheckDriverByEmailRepository {
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
