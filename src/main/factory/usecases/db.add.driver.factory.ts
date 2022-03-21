import { DbAddDriver } from "../../../data/usecases/driver/db.add.driver";
import { IAddDriver } from "../../../domain/usecases/add.driver";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt.adapter/bcrypt.adapter";
import { CheckDriverByEmailRepository } from "../../../infra/database/prisma/driver/check.driver.by.email.repository";
import { DriverRepository } from "../../../infra/database/prisma/driver/driver.repository";

export function makeDbAddDriver(): IAddDriver {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const driverRepository = new DriverRepository();
  const checkDriverByEmailRepository = new CheckDriverByEmailRepository();
  return new DbAddDriver(
    bcryptAdapter,
    driverRepository,
    checkDriverByEmailRepository
  );
}
