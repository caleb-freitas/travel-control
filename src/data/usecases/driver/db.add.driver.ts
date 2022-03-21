import { IDriverModel } from "../../../domain/models/driver.model";
import {
  IAddDriver,
  IAddDriverModel,
} from "../../../domain/usecases/add.driver";
import { FieldInUseError } from "../../../presentation/errors";
import { ICheckCompanyIdRepository } from "../../protocols/database/company/check.company.id.repository";
import { IAddDriverRepository } from "../../protocols/database/driver/add.driver.repository";
import { ICheckDriverByEmailRepository } from "../../protocols/database/driver/check.driver.by.email.repository";
import { IHasher } from "../company/db.add.company.protocols";

export class DbAddDriver implements IAddDriver {
  constructor(
    private readonly hasher: IHasher,
    private readonly driverRepository: IAddDriverRepository,
    private readonly checkDriverByEmailRepository: ICheckDriverByEmailRepository,
    private readonly checkCompanyIdRepository: ICheckCompanyIdRepository
  ) {}
  async add(account: IAddDriverModel): Promise<IDriverModel | Error> {
    await this.checkCompanyIdRepository.checkId(account.company_id);
    const emailExists = await this.checkDriverByEmailRepository.checkEmail(
      account.email
    );
    if (emailExists) {
      return new FieldInUseError("email");
    }
    const hashedPassword = await this.hasher.hash(account.password);
    const driverAccount = await this.driverRepository.add({
      ...account,
      password: hashedPassword,
    });
    return driverAccount;
  }
}
