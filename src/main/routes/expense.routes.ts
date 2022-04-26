import { adaptRoute } from "@/main/adapters";
import {
  makeAddExpenseController,
  makeLoadExpensesByTravelController,
} from "@/main/factory/controllers";
import { authorization } from "@/main/middleware";
import { Router } from "express";

export default (router: Router): void => {
  router.post(
    "/expense/:travel_id",
    authorization,
    adaptRoute(makeAddExpenseController())
  );

  router.get(
    "/expense/:travel_id",
    authorization,
    adaptRoute(makeLoadExpensesByTravelController())
  );
};
