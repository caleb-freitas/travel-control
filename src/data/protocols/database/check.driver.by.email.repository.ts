export interface ICheckDriverByEmailRepository {
  checkEmail(email: string): Promise<boolean>;
}
