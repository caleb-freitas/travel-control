import { MissingParamError } from "../errors/missing.param.error";
import { badRequest } from "../helpers/http";
import { IController } from "../protocols/controller";
import { IHttpRequest, IHttpResponse } from "../protocols/http";

describe("CompanySignUpController", () => {
  test("should return 400 if no name is provided", async () => {
    class CompanySignUpController implements IController {
      async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        if (!httpRequest.body.name) {
          return badRequest(new MissingParamError("name"));
        }
        return {
          statusCode: 200,
          body: "",
        };
      }
    }
    const sut = new CompanySignUpController();
    const httpRequest = {
      body: {
        email: "valid@mail.com",
        password: "valid_password",
        passwordConfirmation: "valid_password",
        country: "valid_country",
        cnpj: "valid_cnpj",
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(badRequest(new MissingParamError("name")));
  });
});
