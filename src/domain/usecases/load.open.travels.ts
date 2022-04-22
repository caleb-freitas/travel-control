import { Travel } from "@/domain/usecases";

export interface ILoadOpenTravels {
  load(company_id: string): Promise<Travel.Model[]>;
}
