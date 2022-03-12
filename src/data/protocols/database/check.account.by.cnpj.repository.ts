export interface ICheckAccountByCnpjRepository {
  checkCnpj(cnpj: string): Promise<boolean>;
}
