import { DbAddDriver } from "@/data/usecases";
import { IAddDriver } from "@/domain/usecases";
import { BcryptAdapter } from "@/infra/cryptography";
import {
  CheckCompanyIdRepository,
  CheckDriverByEmailRepository,
  DriverRepository,
} from "@/infra/repositories";

export function makeDbAddDriver(): IAddDriver {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const driverRepository = new DriverRepository();
  const checkDriverByEmailRepository = new CheckDriverByEmailRepository();
  const checkCompanyIdRepository = new CheckCompanyIdRepository();
  return new DbAddDriver(
    bcryptAdapter,
    driverRepository,
    checkDriverByEmailRepository,
    checkCompanyIdRepository
  );
}
