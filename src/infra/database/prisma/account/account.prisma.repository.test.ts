import { IAddAccountModel } from "../../../../domain/usecases/add.account";
import { AccountPrismaRepository } from "./account.prisma.repository";

describe("AccountPrismaRepository", () => {
  test("should create a new company account", async () => {
    const sut = new AccountPrismaRepository();
    const account: IAddAccountModel = {
      name: "Ligeiro Transportes",
      email: "ligeiro.transportadora@gmail.com",
      password: "logistica123456",
      cnpj: "000.000.000/0001-01",
    };
    const response = await sut.add(account);
    expect(response).toHaveProperty("id");
  });
});
