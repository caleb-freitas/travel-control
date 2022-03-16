import { ICheckCompanyByCnpjRepository } from "../../../../src/data/protocols/database/company/check.company.by.cnpj.repository";
import { ICheckCompanyByEmailRepository } from "../../../../src/data/protocols/database/company/check.company.by.email.repository";
import { DbAddCompany } from "../../../../src/data/usecases/company/db.add.company";
import {
  ICompanyModel,
  IAddCompany,
  IAddCompanyModel,
  IHasher,
  IAddCompanyRepository,
} from "../../../../src/data/usecases/company/db.add.company.protocols";

function makeFakeAccountData(): IAddCompanyModel {
  return {
    name: "valid_name",
    email: "valid@email.com",
    password: "valid_password",
    cnpj: "valid_cnpj",
  };
}

function makeFakeAccount(): ICompanyModel {
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

function makeAddAccountRepository(): IAddCompanyRepository {
  class AddAccountRepositoryStub implements IAddCompanyRepository {
    async add(accountData: IAddCompanyModel): Promise<ICompanyModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountRepositoryStub();
}

function makeCheckCompanyByEmailRepository(): ICheckCompanyByEmailRepository {
  class CheckCompanyByEmailRepositoryStub
    // eslint-disable-next-line prettier/prettier
    implements ICheckCompanyByEmailRepository {
    async checkEmail(email: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new CheckCompanyByEmailRepositoryStub();
}

function makeCheckCompanyByCnpjRepository(): ICheckCompanyByCnpjRepository {
  class CheckCompanyByCnpjRepositoryStub
    // eslint-disable-next-line prettier/prettier
    implements ICheckCompanyByCnpjRepository {
    async checkCnpj(cnpj: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new CheckCompanyByCnpjRepositoryStub();
}

interface ISutTypes {
  sut: IAddCompany;
  hasherStub: IHasher;
  addAccountRepositoryStub: IAddCompanyRepository;
  CheckCompanyByEmailRepositoryStub: ICheckCompanyByEmailRepository;
  checkAccountByCnpjRepositoryStub: ICheckCompanyByCnpjRepository;
}

function makeSut(): ISutTypes {
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const CheckCompanyByEmailRepositoryStub = makeCheckCompanyByEmailRepository();
  const checkAccountByCnpjRepositoryStub = makeCheckCompanyByCnpjRepository();
  const sut = new DbAddCompany(
    hasherStub,
    addAccountRepositoryStub,
    CheckCompanyByEmailRepositoryStub,
    checkAccountByCnpjRepositoryStub
  );
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    CheckCompanyByEmailRepositoryStub,
    checkAccountByCnpjRepositoryStub,
  };
}

describe("DbAddCompany", () => {
  test("should call Hasher with correct password", async () => {
    const {
      sut,
      hasherStub,
      CheckCompanyByEmailRepositoryStub,
      checkAccountByCnpjRepositoryStub,
    } = makeSut();
    jest
      .spyOn(CheckCompanyByEmailRepositoryStub, "checkEmail")
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
      CheckCompanyByEmailRepositoryStub,
      checkAccountByCnpjRepositoryStub,
    } = makeSut();
    jest
      .spyOn(CheckCompanyByEmailRepositoryStub, "checkEmail")
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

  test("should call CheckCompanyByEmailRepository with correct email", async () => {
    const { sut, CheckCompanyByEmailRepositoryStub } = makeSut();
    const checkEmailSpy = jest.spyOn(
      CheckCompanyByEmailRepositoryStub,
      "checkEmail"
    );
    await sut.add(makeFakeAccountData());
    expect(checkEmailSpy).toHaveBeenCalledWith("valid@email.com");
  });

  test("should call CheckCompanyByCnpjRepository with correct cnpj", async () => {
    const {
      sut,
      checkAccountByCnpjRepositoryStub,
      CheckCompanyByEmailRepositoryStub,
    } = makeSut();
    jest
      .spyOn(CheckCompanyByEmailRepositoryStub, "checkEmail")
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
      CheckCompanyByEmailRepositoryStub,
      checkAccountByCnpjRepositoryStub,
    } = makeSut();
    jest
      .spyOn(CheckCompanyByEmailRepositoryStub, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    jest
      .spyOn(checkAccountByCnpjRepositoryStub, "checkCnpj")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount());
  });
});
