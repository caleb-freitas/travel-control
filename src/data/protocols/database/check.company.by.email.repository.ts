export interface ICheckCompanyByEmailRepository {
  checkEmail(email: string): Promise<boolean>;
}
