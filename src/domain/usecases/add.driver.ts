import { IDriverModel } from "../models/driver.model";

export interface IAddDriverModel {
  company_id: string;
  name: string;
  email: string;
  password: string;
  driversLicense: string;
}

export interface IAddDriver {
  add(account: IAddDriverModel): Promise<IDriverModel>;
}
