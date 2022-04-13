export interface ICheckTruckByIdRepository {
  check(id: string): Promise<boolean>;
}
