import { IAddDriverRepository } from "../../../../data/protocols/database/driver/add.driver.repository";
import { IDriverModel } from "../../../../domain/models/driver.model";
import { IAddDriverModel } from "../../../../domain/usecases/add.driver";
import { prisma } from "../prisma.client";

export class DriverRepository implements IAddDriverRepository {
  async add(accountData: IAddDriverModel): Promise<IDriverModel> {
    const { company_id, name, password, email, drivers_license } = accountData
    const driverAccount = await prisma.driver.create({
      data: {
        company_id,
        name,
        password,
        email,
        drivers_license
      }
    })
    return driverAccount
  }
}
