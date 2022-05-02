import { Travel } from "@/domain/models";

export interface ILoadOpenTravels {
  load(company_id: string): Promise<Travel.Model[]>;
}
