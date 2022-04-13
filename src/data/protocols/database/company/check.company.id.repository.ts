export interface ICheckCompanyByIdRepository {
  checkId(id: string): Promise<boolean>;
}
