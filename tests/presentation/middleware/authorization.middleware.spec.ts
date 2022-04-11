import { AccessDeniedError } from "@/presentation/errors";
import { forbidden } from "@/presentation/helpers";
import { authorizationSut } from "@/tests/presentation/middleware/sut";
import { mockTokenRequest } from "@/tests/presentation/mocks";

describe("AuthorizationMiddleware", () => {
  test("should return 403 if no access token is provided", async () => {
    const { sut } = authorizationSut();
    const request = mockTokenRequest();
    delete request.headers;
    const response = await sut.handle(request);
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });
});
