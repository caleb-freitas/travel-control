import { companyAccountPath, driverAccountPath } from "./paths/";

export default {
  "/signup/company": companyAccountPath,
  "/signup/driver/{company_id}": driverAccountPath
}
