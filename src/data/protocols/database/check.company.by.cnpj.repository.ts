export interface ICheckCompanyByCnpjRepository {
  checkCnpj(cnpj: string): Promise<boolean>;
}
