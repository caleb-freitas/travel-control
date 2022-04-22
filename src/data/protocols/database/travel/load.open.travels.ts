import { Travel } from "@/domain/usecases";

export interface ILoadOpenTravelsRepository {
  load(company_id: string): Promise<Travel.Model[]>;
}
