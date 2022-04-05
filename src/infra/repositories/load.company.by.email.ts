import {
  ILoadCompanyByEmailRepository,
  LoadCompanyByEmail,
} from "@/data/protocols";
import { ICompanyModel } from "@/domain/models";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class LoadCompanyByEmailRepository implements ILoadCompanyByEmailRepository {
  async loadByEmail(email: string): Promise<LoadCompanyByEmail.Result> {
    const company: ICompanyModel = await prisma.company.findFirst({
      where: {
        email,
      },
    });
    return company;
  }
}
