import { IDriverModel } from "@/domain/models";

export interface IAddDriverModel {
  company_id: string;
  name: string;
  email: string;
  password: string;
  drivers_license: string;
}

export interface IAddDriver {
  add(account: IAddDriverModel): Promise<IDriverModel | Error>;
}
