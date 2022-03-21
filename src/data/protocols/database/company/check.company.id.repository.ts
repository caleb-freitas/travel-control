export interface ICheckCompanyIdRepository {
  checkId(id: string): Promise<boolean>;
}
