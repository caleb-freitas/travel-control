import { DbAuthentication } from "@/data/usecases";
import { IAuthentication } from "@/domain/usecases";

import { makeDbCompanyAuthentication } from "./db.company.authentication";
import { makeDbDriverAuthentication } from "./db.driver.authentication";

export function makeDbAuthentication(): IAuthentication {
  return new DbAuthentication(
    makeDbCompanyAuthentication(),
    makeDbDriverAuthentication()
  );
}
