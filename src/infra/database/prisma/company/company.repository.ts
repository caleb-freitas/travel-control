import { IAddCompanyRepository } from "@/data/protocols";
import { ICompanyModel } from "@/domain/models";
import { IAddCompanyModel } from "@/domain/usecases";
import { prisma } from "@/infra/database";

export class CompanyRepository implements IAddCompanyRepository {
  async add(accountData: IAddCompanyModel): Promise<ICompanyModel> {
    const { name, email, password, cnpj } = accountData;
    const companyAccount = await prisma.company.create({
      data: {
        name,
        email,
        password,
        cnpj,
      },
    });
    return companyAccount;
  }
}
