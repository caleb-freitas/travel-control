export interface ICheckAccountByEmailRepository {
  checkEmail(email: string): Promise<boolean>;
}
