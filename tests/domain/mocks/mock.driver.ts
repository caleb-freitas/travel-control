import { IDriverModel } from "@/domain/models";
import { IAddDriverModel } from "@/domain/usecases";

export const mockDriverResult = (): IDriverModel => ({
  id: "driver_id",
  company_id: "company_id",
  name: "driver",
  email: "driver@email.com",
  password: "hashed_password",
  drivers_license: "drivers_license",
  created_at: new Date("1995-12-17T03:24:00"),
});

export const mockDriverParams = (): IAddDriverModel => ({
  company_id: "company_id",
  name: "driver",
  email: "driver@email.com",
  password: "valid_password",
  drivers_license: "drivers_license",
});

export const mockHashedDriverParams = (): IAddDriverModel => ({
  company_id: "company_id",
  name: "driver",
  email: "driver@email.com",
  password: "hashed_password",
  drivers_license: "drivers_license",
});
