import { adaptRoute } from "@/main/adapters";
import { makeLoadBillingBetweenDatesController } from "@/main/factory/controllers";
import { authorization } from "@/main/middleware";
import { Router } from "express";

export default (router: Router): void => {
  router.get(
    "/billing",
    authorization,
    adaptRoute(makeLoadBillingBetweenDatesController())
  );
};
