export interface ILoadCompanyByEmailRepository {
  loadByEmail(email: string): Promise<boolean>;
}
