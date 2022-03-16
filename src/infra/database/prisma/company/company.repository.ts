import { IAddCompanyRepository } from "../../../../data/usecases/company/db.add.company.protocols";
import { ICompanyModel } from "../../../../domain/models/company.model";
import { IAddCompanyModel } from "../../../../domain/usecases/add.company";
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
