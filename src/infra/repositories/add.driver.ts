import { IAddDriverRepository } from "@/data/protocols";
import { IDriverModel } from "@/domain/models";
import { IAddDriverModel } from "@/domain/usecases";
import { prisma } from "@/infra/repositories";

export class DriverRepository implements IAddDriverRepository {
  async add(accountData: IAddDriverModel): Promise<IDriverModel> {
    const { company_id, name, password, email, drivers_license } = accountData;
    const driverAccount = await prisma.driver.create({
      data: {
        company_id,
        name,
        password,
        email,
        drivers_license,
      },
    });
    return driverAccount;
  }
}
