import { DbAuthentication } from "@/data/usecases";
import { IAuthentication } from "@/domain/usecases";
import {
  makeDbCompanyAuthentication,
  makeDbDriverAuthentication,
} from "@/main/factory/usecases";

export function makeDbAuthentication(): IAuthentication {
  return new DbAuthentication(
    makeDbCompanyAuthentication(),
    makeDbDriverAuthentication()
  );
}
