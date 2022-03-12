import { ICheckAccountByEmailRepository } from "../../../../data/protocols/database/check.account.by.email.repository";

export class CheckAccountByEmailRepository
  // eslint-disable-next-line prettier/prettier
  implements ICheckAccountByEmailRepository {
  checkEmail(email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
