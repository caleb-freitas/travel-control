import { companyAccountPath, driverAccountPath } from "./paths/";
import { loginPath } from "./paths/login.path";

export default {
  "/signup/company": companyAccountPath,
  "/signup/driver/{company_id}": driverAccountPath,
  "/login": loginPath
}
