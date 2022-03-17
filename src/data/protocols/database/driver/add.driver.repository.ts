import { IDriverModel } from "../../../../domain/models/driver.model";
import { IAddDriverModel } from "../../../../domain/usecases/add.driver";

export interface IAddDriverRepository {
  add(accountData: IAddDriverModel): Promise<IDriverModel>;
}
