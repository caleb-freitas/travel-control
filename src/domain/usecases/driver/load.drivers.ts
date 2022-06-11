import { Driver } from "@/domain/models";

export interface ILoadDrivers {
  load(): Promise<Driver.Model[]>;
}
