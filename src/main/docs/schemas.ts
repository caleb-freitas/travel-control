import {
  companyParamsSchema,
  companyResultSchema,
  driverParamsSchema,
  driverResultSchema,
  loginParamsSchema,
  loginResultSchema,
  errorSchema,
  truckParamsSchema,
  truckResultSchema,
  travelParamsSchema,
  travelResultSchema
} from "./schemas/"
import {} from "./schemas/login.params.schema"


export default {
  companyParams: companyParamsSchema,
  companyResult: companyResultSchema,
  driverParams: driverParamsSchema,
  driverResult: driverResultSchema,
  loginParams: loginParamsSchema,
  loginResult: loginResultSchema,
  truckParams: truckParamsSchema,
  truckResult: truckResultSchema,
  travelParams: travelParamsSchema,
  travelResult: travelResultSchema,
  error: errorSchema,
}
