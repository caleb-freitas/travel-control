import { adaptMiddleware } from "@/main/adapters";
import { makeAuthMiddleware } from "@/main/factory";

export const adminAuthenticated = adaptMiddleware(
  makeAuthMiddleware("company")
);
