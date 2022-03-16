import { IDriverModel } from "../../../domain/models/driver.model";
import {
  IAddDriver,
  IAddDriverModel,
} from "../../../domain/usecases/add.driver";
import { IHasher } from "../company/db.add.company.protocols";

export class DbAddDriver implements IAddDriver {
  constructor(private readonly hasher: IHasher) {}
  async add(account: IAddDriverModel): Promise<IDriverModel | boolean> {
    await this.hasher.hash(account.password);
    return true;
  }
}
