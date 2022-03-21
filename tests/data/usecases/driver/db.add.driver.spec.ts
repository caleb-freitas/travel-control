import { IHasher } from "../../../../src/data/protocols/cryptography/hasher";
import { ICheckCompanyIdRepository } from "../../../../src/data/protocols/database/company/check.company.id.repository";
import { IAddDriverRepository } from "../../../../src/data/protocols/database/driver/add.driver.repository";
import { ICheckDriverByEmailRepository } from "../../../../src/data/protocols/database/driver/check.driver.by.email.repository";
import { DbAddDriver } from "../../../../src/data/usecases/driver/db.add.driver";
import { IDriverModel } from "../../../../src/domain/models/driver.model";
import {
  IAddDriver,
  IAddDriverModel,
} from "../../../../src/domain/usecases/add.driver";
import { FieldInUseError } from "../../../../src/presentation/errors";

function makeFakeAccount(): IDriverModel {
  return {
    id: "valid_id",
    company_id: "valid_id",
    name: "valid_name",
    email: "valid_email@mail.com",
    password: "hashed_password",
    drivers_license: "drivers_license",
    created_at: new Date("1995-12-17T03:24:00"),
  };
}

function makeFakeAccountData(): IAddDriverModel {
  return {
    company_id: "valid_id",
    name: "valid_name",
    email: "valid@email.com",
    password: "valid_password",
    drivers_license: "drivers_license",
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

function makeAddDriverRepository(): IAddDriverRepository {
  class AddDriverRepositoryStub implements IAddDriverRepository {
    add(accountData: IAddDriverModel): Promise<IDriverModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddDriverRepositoryStub();
}

function makeCheckByEmailRepository(): ICheckDriverByEmailRepository {
  class CheckByEmailRepositoryStub implements ICheckDriverByEmailRepository {
    async checkEmail(email: string): Promise<boolean> {
      return new Promise((resolve) => resolve(false));
    }
  }
  return new CheckByEmailRepositoryStub();
}

function makeCheckCompanyIdRepository(): ICheckCompanyIdRepository {
  class CheckCompanyIdRepositoryStub implements ICheckCompanyIdRepository {
    async checkId(id: string): Promise<boolean> {
      return new Promise((resolve) => resolve(false));
    }
  }
  return new CheckCompanyIdRepositoryStub();
}

interface ISutTypes {
  sut: IAddDriver;
  hasherStub: IHasher;
  addDriverRepositoryStub: IAddDriverRepository;
  checkByEmailRepositoryStub: ICheckDriverByEmailRepository;
  checkCompanyIdRepositoryStub: ICheckCompanyIdRepository;
}

function makeSut(): ISutTypes {
  const hasherStub = makeHasher();
  const addDriverRepositoryStub = makeAddDriverRepository();
  const checkByEmailRepositoryStub = makeCheckByEmailRepository();
  const checkCompanyIdRepositoryStub = makeCheckCompanyIdRepository();
  const sut = new DbAddDriver(
    hasherStub,
    addDriverRepositoryStub,
    checkByEmailRepositoryStub,
    checkCompanyIdRepositoryStub
  );
  return {
    sut,
    hasherStub,
    addDriverRepositoryStub,
    checkByEmailRepositoryStub,
    checkCompanyIdRepositoryStub,
  };
}

describe("DbAddDriver", () => {
  test("should call Hasher with correct password", async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, "hash");
    await sut.add(makeFakeAccountData());
    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });

  test("should call AddDriverRepository with correct values", async () => {
    const { sut, addDriverRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addDriverRepositoryStub, "add");
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      company_id: "valid_id",
      name: "valid_name",
      email: "valid@email.com",
      password: "hashed_password",
      drivers_license: "drivers_license",
    });
  });

  test("should return a driver account on success", async () => {
    const { sut } = makeSut();
    const response = await sut.add(makeFakeAccountData());
    expect(response).toEqual(makeFakeAccount());
  });

  test("should call CheckByEmailRepository with correct email", async () => {
    const { sut, checkByEmailRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(checkByEmailRepositoryStub, "checkEmail");
    await sut.add(makeFakeAccount());
    expect(addSpy).toHaveBeenCalledWith("valid_email@mail.com");
  });

  test("should return a FieldInUseError if CheckByEmailRepository return true", async () => {
    const { sut, checkByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(checkByEmailRepositoryStub, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(true)));
    const error = await sut.add(makeFakeAccount());
    expect(error).toEqual(new FieldInUseError("email"));
  });

  test("should call CheckCompanyIdRepository with correct id", async () => {
    const { sut, checkCompanyIdRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(checkCompanyIdRepositoryStub, "checkId");
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith("valid_id");
  });
});
