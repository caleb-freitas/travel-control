import { ILoadOpenTravelsRepository } from "@/data/protocols";
import { ILoadOpenTravels, Travel } from "@/domain/usecases";

export class DbLoadOpenTravels implements ILoadOpenTravels {
  constructor(
    private readonly loadOpenTravelsRepository: ILoadOpenTravelsRepository
  ) {}

  async load(company_id: string): Promise<Travel.Model[]> {
    const travels = await this.loadOpenTravelsRepository.load(company_id);
    return travels;
  }
}
