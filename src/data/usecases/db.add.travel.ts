import {
  IAddTravelRepository,
  ICheckCompanyByIdRepository,
  ICheckDriverByIdRepository,
  ICheckTruckByIdRepository,
} from "@/data/protocols";
import { IAddTravel, Travel } from "@/domain/usecases";
import { InvalidParamError } from "@/presentation/errors";

export class DbAddTravel implements IAddTravel {
  constructor(
    private readonly addTravel: IAddTravelRepository,
    private readonly checkCompanyId: ICheckCompanyByIdRepository,
    private readonly checkDriverId: ICheckDriverByIdRepository,
    private readonly checkTruckId: ICheckTruckByIdRepository
  ) {}

  async add(travelData: Travel.Params): Promise<Travel.Model | Error> {
    const { company_id, truck_id, driver_id } = travelData;
    const truckExists = this.checkTruckId.check(truck_id);
    const driverExists = this.checkDriverId.check(driver_id);
    const companyExists = this.checkCompanyId.checkId(company_id);
    if (!truckExists) {
      return new InvalidParamError("truck_id");
    }
    if (!driverExists) {
      return new InvalidParamError("driver_id");
    }
    if (!companyExists) {
      return new InvalidParamError("company_id");
    }
    const travel = this.addTravel.add({
      ...travelData,
    });
    return travel;
  }
}
