import { IHasher } from "../../../../src/data/protocols/cryptography/hasher";
import { DbAddDriver } from "../../../../src/data/usecases/driver/db.add.driver";
import {
  IAddDriver,
  IAddDriverModel,
} from "../../../../src/domain/usecases/add.driver";

function makeFakeAccountData(): IAddDriverModel {
  return {
    company_id: "valid_id",
    name: "valid_name",
    email: "valid@email.com",
    password: "valid_password",
    driversLicense: "valid_password",
  };
}

function makeHasher(): IHasher {
  class HasherStub implements IHasher {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_string"));
    }
  }
  return new HasherStub();
}

interface ISutTypes {
  sut: IAddDriver;
  hasherStub: IHasher;
}

function makeSut(): ISutTypes {
  const hasherStub = makeHasher();
  const sut = new DbAddDriver(hasherStub);
  return {
    sut,
    hasherStub,
  };
}

describe("DbAddDriver", () => {
  test("should call Hasher with correct password", async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, "hash");
    await sut.add(makeFakeAccountData());
    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });
});
