import { adaptMiddleware } from "@/main/adapters";
import { makeAuthorizationMiddleware } from "@/main/factory";

export const authorization = adaptMiddleware(makeAuthorizationMiddleware());
