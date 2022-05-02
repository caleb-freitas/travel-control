import {
  IAddDriverRepository,
  ICheckCompanyByIdRepository,
  ICheckDriverByEmailRepository,
  IHasher,
} from "@/data/protocols/";
import { IDriverModel } from "@/domain/models";
import { IAddDriver, IAddDriverModel } from "@/domain/usecases";
import { FieldInUseError, InvalidParamError } from "@/presentation/errors";

export class DbAddDriver implements IAddDriver {
  constructor(
    private readonly hasher: IHasher,
    private readonly driverRepository: IAddDriverRepository,
    private readonly checkDriverByEmailRepository: ICheckDriverByEmailRepository,
    private readonly checkCompanyIdRepository: ICheckCompanyByIdRepository
  ) {}

  async add(account: IAddDriverModel): Promise<IDriverModel | Error> {
    const companyIdExists = await this.checkCompanyIdRepository.checkId(
      account.company_id
    );
    const emailExists = await this.checkDriverByEmailRepository.checkEmail(
      account.email
    );
    if (emailExists) {
      return new FieldInUseError("email");
    }
    if (!companyIdExists) {
      return new InvalidParamError("company_id");
    }
    const hashedPassword = await this.hasher.hash(account.password);
    const driverAccount = await this.driverRepository.add({
      ...account,
      password: hashedPassword,
    });
    return driverAccount;
  }
}
