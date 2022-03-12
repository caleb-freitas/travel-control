import { ICheckAccountByCnpjRepository } from "../../../src/data/protocols/database/check.account.by.cnpj.repository";
import { ICheckAccountByEmailRepository } from "../../../src/data/protocols/database/check.account.by.email.repository";
import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IAddAccountRepository,
  IHasher,
} from "../../../src/data/usecases";
import { DbAddAccount } from "../../../src/data/usecases/db.add.account";

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
    async checkEmail(email: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new CheckAccountByEmailRepositoryStub();
}

function makeCheckAccountByCnpjRepository(): ICheckAccountByCnpjRepository {
  class CheckAccountByCnpjRepositoryStub
    // eslint-disable-next-line prettier/prettier
    implements ICheckAccountByCnpjRepository {
    async checkCnpj(cnpj: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new CheckAccountByCnpjRepositoryStub();
}

interface ISutTypes {
  sut: IAddAccount;
  hasherStub: IHasher;
  addAccountRepositoryStub: IAddAccountRepository;
  checkAccountByEmailRepositoryStub: ICheckAccountByEmailRepository;
  checkAccountByCnpjRepositoryStub: ICheckAccountByCnpjRepository;
}

function makeSut(): ISutTypes {
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const checkAccountByEmailRepositoryStub = makeCheckAccountByEmailRepository();
  const checkAccountByCnpjRepositoryStub = makeCheckAccountByCnpjRepository();
  const sut = new DbAddAccount(
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub,
    checkAccountByCnpjRepositoryStub
  );
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub,
    checkAccountByCnpjRepositoryStub,
  };
}

describe("DbAddAccount", () => {
  test("should call Hasher with correct password", async () => {
    const {
      sut,
      hasherStub,
      checkAccountByEmailRepositoryStub,
      checkAccountByCnpjRepositoryStub,
    } = makeSut();
    jest
      .spyOn(checkAccountByEmailRepositoryStub, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    jest
      .spyOn(checkAccountByCnpjRepositoryStub, "checkCnpj")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const hashSpy = jest.spyOn(hasherStub, "hash");
    await sut.add(makeFakeAccountData());
    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });

  test("should call AddAccountRepository with correct values", async () => {
    const {
      sut,
      addAccountRepositoryStub,
      checkAccountByEmailRepositoryStub,
      checkAccountByCnpjRepositoryStub,
    } = makeSut();
    jest
      .spyOn(checkAccountByEmailRepositoryStub, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    jest
      .spyOn(checkAccountByCnpjRepositoryStub, "checkCnpj")
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

  test("should call CheckAccountByCnpjRepository with correct cnpj", async () => {
    const {
      sut,
      checkAccountByCnpjRepositoryStub,
      checkAccountByEmailRepositoryStub,
    } = makeSut();
    jest
      .spyOn(checkAccountByEmailRepositoryStub, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    jest
      .spyOn(checkAccountByCnpjRepositoryStub, "checkCnpj")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const checkCnpjSpy = jest.spyOn(
      checkAccountByCnpjRepositoryStub,
      "checkCnpj"
    );
    await sut.add(makeFakeAccountData());
    expect(checkCnpjSpy).toHaveBeenCalledWith("valid_cnpj");
  });

  test("should return an account on success", async () => {
    const {
      sut,
      checkAccountByEmailRepositoryStub,
      checkAccountByCnpjRepositoryStub,
    } = makeSut();
    jest
      .spyOn(checkAccountByEmailRepositoryStub, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    jest
      .spyOn(checkAccountByCnpjRepositoryStub, "checkCnpj")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount());
  });
});