import { IHttpRequest } from "@/presentation/protocols";
import {
  mockDriverResult,
  mockTravelParams,
  mockTruckParams,
} from "@/tests/domain/mocks";

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

export const mockTruckRequest = (): IHttpRequest => ({
  body: {
    ...mockTruckParams(),
  },
});

export const mockTravelRequest = (): IHttpRequest => ({
  body: {
    company_id: "company_id",
    client: "client",
    departure_city: "departure_city",
    departure_state: "departure_state",
    destination_city: "destination_city",
    destination_state: "destination_state",
  },
  params: {
    driver_id: "driver_id",
    truck_id: "truck_id",
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
