export interface ICheckTruckLicensePlateRepository {
  check(licensePlate: string): Promise<boolean>;
}
