import { IDriverModel } from "../../../domain/models/driver.model";
import {
  IAddDriver,
  IAddDriverModel,
} from "../../../domain/usecases/add.driver";
import { IAddDriverRepository } from "../../protocols/database/driver/add.driver.repository";
import { ICheckDriverByEmailRepository } from "../../protocols/database/driver/check.driver.by.email.repository";
import { IHasher } from "../company/db.add.company.protocols";

export class DbAddDriver implements IAddDriver {
  constructor(
    private readonly hasher: IHasher,
    private readonly driverRepository: IAddDriverRepository,
    private readonly checkDriverByEmailRepository: ICheckDriverByEmailRepository
  ) {}
  async add(account: IAddDriverModel): Promise<IDriverModel | boolean> {
    await this.checkDriverByEmailRepository.checkEmail(account.email);
    const hashedPassword = await this.hasher.hash(account.password);
    const driverAccount = await this.driverRepository.add({
      ...account,
      password: hashedPassword,
    });
    return driverAccount;
  }
}
