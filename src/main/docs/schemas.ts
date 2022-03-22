import { companyAccountSchema, companySchema, errorSchema } from "./schemas/";
import { driverSchema } from "./schemas/driver.account.schema";
import { driverAccountSchema } from "./schemas/driver.signup.schema";

export default {
  companyAccount: companyAccountSchema,
  companyModel: companySchema,
  driverAccount: driverAccountSchema,
  driverModel: driverSchema,
  error: errorSchema,
}