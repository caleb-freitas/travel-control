import { IHasher } from "../../../../src/data/protocols/cryptography/hasher";
import { IAddDriverRepository } from "../../../../src/data/protocols/database/driver/add.driver.repository";
import { DbAddDriver } from "../../../../src/data/usecases/driver/db.add.driver";
import { IDriverModel } from "../../../../src/domain/models/driver.model";
import {
  IAddDriver,
  IAddDriverModel,
} from "../../../../src/domain/usecases/add.driver";

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

interface ISutTypes {
  sut: IAddDriver;
  hasherStub: IHasher;
  addDriverRepositoryStub: IAddDriverRepository;
}

function makeSut(): ISutTypes {
  const hasherStub = makeHasher();
  const addDriverRepositoryStub = makeAddDriverRepository();
  const sut = new DbAddDriver(hasherStub, addDriverRepositoryStub);
  return {
    sut,
    hasherStub,
    addDriverRepositoryStub,
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
});
