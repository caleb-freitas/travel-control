export interface ICheckTravelByIdRepository {
  check(id: string): Promise<boolean>;
}
