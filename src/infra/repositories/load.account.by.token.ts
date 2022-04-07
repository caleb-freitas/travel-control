import { ILoadAccountByTokenRepository } from "@/data/protocols";
import { ICompanyModel, IDriverModel } from "@/domain/models";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class LoadAccountByTokenRepository implements ILoadAccountByTokenRepository {
  async loadByToken(token: string): Promise<ICompanyModel | IDriverModel> {
    const company = await prisma.company.findFirst({
      where: {
        access_token: token,
      },
    });
    if (company) {
      return company;
    }
    const driver = await prisma.driver.findFirst({
      where: {
        access_token: token,
      },
    });
    if (driver) {
      return driver;
    }
    return null;
  }
}
