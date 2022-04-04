import { IDriverModel } from "@/domain/models";

export const mockDriverResult = (): IDriverModel => ({
  id: "driver_id",
  company_id: "company_id",
  name: "name",
  email: "valid@email.com",
  password: "hashed_password",
  drivers_license: "drivers_license",
  created_at: new Date(),
});
