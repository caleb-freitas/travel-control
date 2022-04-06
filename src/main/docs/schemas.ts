import {
  companyParamsSchema,
  companyResultSchema,
  driverParamsSchema,
  driverResultSchema,
  loginParamsSchema,
  loginResultSchema,
  errorSchema
} from "./schemas/"
import {} from "./schemas/login.params.schema"

export default {
  companyParams: companyParamsSchema,
  companyResult: companyResultSchema,
  driverParams: driverParamsSchema,
  driverResult: driverResultSchema,
  loginParams: loginParamsSchema,
  loginResult: loginResultSchema,
  error: errorSchema,
}
