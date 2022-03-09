import { IAccountModel } from "../../../domain/models/account.model";
import {
  IAddAccount,
  IAddAccountModel,
} from "../../../domain/usecases/add.account";
import { IHasher } from "../../protocols/cryptography/hasher";
import { IAddAccountRepository } from "../../protocols/database/add.account.repository";
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

interface ISutTypes {
  sut: IAddAccount;
  hasherStub: IHasher;
  addAccountRepositoryStub: IAddAccountRepository;
}

function makeSut(): ISutTypes {
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub);
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
  };
}

describe("DbAddAccount", () => {
  test("should call Hasher with correct password", async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, "hash");
    await sut.add(makeFakeAccountData());
    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });

  test("should throw if Hasher throw", async () => {
    const { sut, hasherStub } = makeSut();
    jest
      .spyOn(hasherStub, "hash")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.add(makeFakeAccountData());
    expect(promise).rejects.toThrow();
  });

  test("should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid@email.com",
      password: "hashed_password",
      cnpj: "valid_cnpj",
    });
  });

  test("should throw if Hasher throw", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.add(makeFakeAccountData());
    expect(promise).rejects.toThrow();
  });

  test("should return an account on success", async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount());
  });
});
