import { adaptMiddleware } from "@/main/adapters";
import { makeAuthMiddleware } from "@/main/factory";

export const authentication = adaptMiddleware(makeAuthMiddleware());
