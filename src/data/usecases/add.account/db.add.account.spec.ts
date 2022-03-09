import {
  IAddAccount,
  IAddAccountModel,
} from "../../../domain/usecases/add.account";
import { IHasher } from "../../protocols/cryptography/hasher";
import { DbAddAccount } from "./db.add.account";

function makeFaceAccountData(): IAddAccountModel {
  return {
    name: "valid_name",
    email: "valid@email.com",
    password: "valid_password",
    passwordConfirmation: "valid_password",
    cnpj: "valid_cnpj",
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

interface ISutTypes {
  sut: IAddAccount;
  hasherStub: IHasher;
}

function makeSut(): ISutTypes {
  const hasherStub = makeHasher();
  const sut = new DbAddAccount(hasherStub);
  return {
    sut,
    hasherStub,
  };
}

describe("DbAddAccount", () => {
  test("should call Hasher with correct password", async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, "hash");
    await sut.add(makeFaceAccountData());
    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });
});
