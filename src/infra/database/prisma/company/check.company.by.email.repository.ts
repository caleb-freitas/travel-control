
import { ICheckCompanyByEmailRepository } from "@/data/protocols";
import { prisma } from "../prisma.client";

export class CheckCompanyByEmailRepository implements ICheckCompanyByEmailRepository {
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
