import {
  companyAccountPath,
  driverAccountPath,
  loginPath,
  truckPath,
  addTravelPath
} from "./paths/";

export default {
  "/signup/company": companyAccountPath,
  "/signup/driver": driverAccountPath,
  "/login": loginPath,
  "/truck": truckPath,
  "/travel/{driver_id}/{truck_id}": addTravelPath
}
