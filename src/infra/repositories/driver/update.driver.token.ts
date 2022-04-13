import { IUpdateDriverTokenRepository } from "@/data/protocols";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class UpdateDriverTokenRepository implements IUpdateDriverTokenRepository {
  async updateAccessToken(id: string, token: string): Promise<void> {
    await prisma.driver.update({
      where: {
        id,
      },
      data: {
        access_token: token,
      },
    });
  }
}
