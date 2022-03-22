import { IAddCompanyRepository } from "@/data/protocols";
import { ICompanyModel } from "@/domain/models";
import { IAddCompanyModel } from "@/domain/usecases";

import { prisma } from "../prisma.client";

export class CompanyRepository implements IAddCompanyRepository {
  async add(accountData: IAddCompanyModel): Promise<ICompanyModel> {
    const { name, email, password, cnpj } = accountData;
    const account = await prisma.company.create({
      data: {
        name,
        email,
        password,
        cnpj,
      },
    });
    return account;
  }
}
