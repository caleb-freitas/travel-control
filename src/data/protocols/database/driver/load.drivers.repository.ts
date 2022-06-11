import { Driver } from "@/domain/models";

export interface ILoadDriversRepository {
  load(): Promise<Driver.Model[]>
}
