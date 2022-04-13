import { IAddCompanyRepository } from "@/data/protocols";
import { ICompanyModel } from "@/domain/models";
import { IAddCompanyModel } from "@/domain/usecases";
import { prisma } from "@/infra/repositories";

export class AddCompanyRepository implements IAddCompanyRepository {
  async add(companyData: IAddCompanyModel): Promise<ICompanyModel> {
    const company = await prisma.company.create({
      data: {
        ...companyData,
      },
    });
    return company;
  }
}
