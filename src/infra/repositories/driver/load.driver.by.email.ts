import {
  ILoadDriverByEmailRepository,
  LoadDriverByEmail,
} from "@/data/protocols";
import { IDriverModel } from "@/domain/models";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class LoadDriverByEmailRepository implements ILoadDriverByEmailRepository {
  async loadByEmail(email: string): Promise<LoadDriverByEmail.Result> {
    const driver: IDriverModel = await prisma.driver.findFirst({
      where: {
        email,
      },
    });
    return driver;
  }
}
