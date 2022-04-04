import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from "@/presentation/protocols";

describe("CompanyLoginController", () => {
  test("should call validation with correct values", async () => {
    class CompanyLoginController implements IController {
      constructor(private readonly validation: IValidation) {}

      async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        await this.validation.validate(httpRequest.body);

        return {
          statusCode: 200,
          body: {},
        };
      }
    }
    class ValidationStub implements IValidation {
      validate(input: any): Error {
        return null;
      }
    }
    const validationStub = new ValidationStub();
    const sut = new CompanyLoginController(validationStub);
    const validateSpy = jest.spyOn(validationStub, "validate");
    await sut.handle({
      body: {
        email: "valid@email.com",
        password: "password",
      },
    });
    expect(validateSpy).toHaveBeenCalledWith({
      email: "valid@email.com",
      password: "password",
    });
  });
});
