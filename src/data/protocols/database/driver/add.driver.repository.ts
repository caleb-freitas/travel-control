import { IDriverModel } from "@/domain/models";
import { IAddDriverModel } from "@/domain/usecases";

export interface IAddDriverRepository {
  add(accountData: IAddDriverModel): Promise<IDriverModel>;
}
