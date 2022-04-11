import { DbAddDriver } from "@/data/usecases";
import { IAddDriver } from "@/domain/usecases";
import { BcryptAdapter } from "@/infra/cryptography";
import {
  CheckCompanyByIdRepository,
  CheckDriverByEmailRepository,
  AddDriverRepository,
} from "@/infra/repositories";

export function makeDbAddDriver(): IAddDriver {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const driverRepository = new AddDriverRepository();
  const checkDriverByEmailRepository = new CheckDriverByEmailRepository();
  const checkCompanyIdRepository = new CheckCompanyByIdRepository();
  return new DbAddDriver(
    bcryptAdapter,
    driverRepository,
    checkDriverByEmailRepository,
    checkCompanyIdRepository
  );
}
