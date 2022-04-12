import {
  IAddTruckRepository,
  ICheckCompanyByIdRepository,
  ICheckTruckLicensePlateRepository,
} from "@/data/protocols/database";
import { IAddTruck, Truck } from "@/domain/usecases";
import { FieldInUseError, InvalidParamError } from "@/presentation/errors";

export class DbAddTruck implements IAddTruck {
  constructor(
    private readonly checkTruckLicensePlate: ICheckTruckLicensePlateRepository,
    private readonly checkCompanyIdRepository: ICheckCompanyByIdRepository,
    private readonly addTruck: IAddTruckRepository
  ) {}

  async add(data: Truck.Params): Promise<Truck.Model> {
    const companyExists = await this.checkCompanyIdRepository.checkId(
      data.company_id
    );
    if (!companyExists) {
      return new InvalidParamError("company_id");
    }
    const licensePlateExists = await this.checkTruckLicensePlate.check(
      data.license_plate
    );
    if (licensePlateExists) {
      return new FieldInUseError("license_plate");
    }
    const truck = await this.addTruck.add({
      ...data,
    });
    return truck;
  }
}
