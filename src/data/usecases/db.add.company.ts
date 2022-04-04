import {
  IAddCompanyRepository,
  ICheckCompanyByCnpjRepository,
  ICheckCompanyByEmailRepository,
  IHasher,
} from "@/data/protocols";
import { ICompanyModel } from "@/domain/models";
import { IAddCompany, IAddCompanyModel } from "@/domain/usecases";
import { FieldInUseError } from "@/presentation/errors";

export class DbAddCompany implements IAddCompany {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddCompanyRepository,
    private readonly checkCompanyByEmailRepository: ICheckCompanyByEmailRepository,
    private readonly checkAccountByCnpjRepository: ICheckCompanyByCnpjRepository
  ) {}
  async add(
    accountData: IAddCompanyModel
  ): Promise<ICompanyModel | FieldInUseError> {
    const emailExists = await this.checkCompanyByEmailRepository.checkEmail(
      accountData.email
    );
    const cnpjExists = await this.checkAccountByCnpjRepository.checkCnpj(
      accountData.cnpj
    );
    if (emailExists) {
      return new FieldInUseError("email");
    }
    if (cnpjExists) {
      return new FieldInUseError("cnpj");
    }
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return account;
  }
}
