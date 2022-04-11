import { IHttpRequest } from "@/presentation/protocols";
import { mockDriverResult } from "@/tests/domain/mocks";

export const mockCompanyRequest = (): IHttpRequest => ({
  body: {
    name: "company",
    email: "company@email.com",
    password: "valid_password",
    passwordConfirmation: "valid_password",
    cnpj: "company_cnpj",
  },
});

export const mockDriverRequest = (): IHttpRequest => ({
  body: {
    company_id: "company_id",
    name: "driver",
    email: "driver@email.com",
    password: "valid_password",
    passwordConfirmation: "valid_password",
    drivers_license: "drivers_license",
  },
});

export const mockLoginRequest = (): IHttpRequest => ({
  body: {
    email: "valid@email.com",
    password: "valid_pass",
    role: "role",
  },
});

export const mockTokenRequest = (): IHttpRequest => ({
  headers: {
    "x-access-token": "any_token",
  },
});

export const mockInvalidRole = () => ({
  role: "driver",
  account: mockDriverResult(),
});
