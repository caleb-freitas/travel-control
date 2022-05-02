import { adaptRoute } from "@/main/adapters";
import { makeLoadBillingBetweenDatesController } from "@/main/factory/controllers";
import { Router } from "express";

export default (router: Router): void => {
  router.get("/billing", adaptRoute(makeLoadBillingBetweenDatesController()));
};
