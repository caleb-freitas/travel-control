import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IAddAccountRepository,
  IHasher,
} from ".";
import { ICheckAccountByEmailRepository } from "../protocols/database/check.account.by.email.repository";
import { DbAddAccount } from "./db.add.account";

function makeFakeAccountData(): IAddAccountModel {
  return {
    name: "valid_name",
    email: "valid@email.com",
    password: "valid_password",
    cnpj: "valid_cnpj",
  };
}

function makeFakeAccount(): IAccountModel {
  return {
    id: "valid_id",
    name: "valid_name",
    email: "valid@email.com",
    password: "hashed_password",
    cnpj: "valid_cnpj",
    created_at: new Date("1995-12-17T03:24:00"),
    updated_at: new Date("1995-12-17T03:24:00"),
  };
}

function makeHasher(): IHasher {
  class HasherStub implements IHasher {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new HasherStub();
}

function makeAddAccountRepository(): IAddAccountRepository {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add(accountData: IAddAccountModel): Promise<IAccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountRepositoryStub();
}

function makeCheckAccountByEmailRepository(): ICheckAccountByEmailRepository {
  class CheckAccountByEmailRepositoryStub
    // eslint-disable-next-line prettier/prettier
    implements ICheckAccountByEmailRepository {
    checkEmail(email: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new CheckAccountByEmailRepositoryStub();
}

interface ISutTypes {
  sut: IAddAccount;
  hasherStub: IHasher;
  addAccountRepositoryStub: IAddAccountRepository;
  checkAccountByEmailRepositoryStub: ICheckAccountByEmailRepository;
}

function makeSut(): ISutTypes {
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const checkAccountByEmailRepositoryStub = makeCheckAccountByEmailRepository();
  const sut = new DbAddAccount(
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub
  );
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub,
  };
}

describe("DbAddAccount", () => {
  test("should call Hasher with correct password", async () => {
    const { sut, hasherStub, checkAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(checkAccountByEmailRepositoryStub, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const hashSpy = jest.spyOn(hasherStub, "hash");
    await sut.add(makeFakeAccountData());
    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });

  test("should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub, checkAccountByEmailRepositoryStub } =
      makeSut();
    jest
      .spyOn(checkAccountByEmailRepositoryStub, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid@email.com",
      password: "hashed_password",
      cnpj: "valid_cnpj",
    });
  });

  test("should call CheckAccountByEmailRepository with correct email", async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut();
    const checkEmailSpy = jest.spyOn(
      checkAccountByEmailRepositoryStub,
      "checkEmail"
    );
    await sut.add(makeFakeAccountData());
    expect(checkEmailSpy).toHaveBeenCalledWith("valid@email.com");
  });

  test("should return an account on success", async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(checkAccountByEmailRepositoryStub, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount());
  });
});
