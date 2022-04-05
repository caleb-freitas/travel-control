import { IUpdateCompanyTokenRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class UpdateCompanyTokenRepository implements IUpdateCompanyTokenRepository {
  async updateAccessToken(id: string, token: string): Promise<void> {
    await prisma.company.update({
      where: {
        id,
      },
      data: {
        access_token: token,
      },
    });
  }
}
