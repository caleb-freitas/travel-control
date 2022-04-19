import { adaptRoute } from "@/main/adapters";
import { makeAddExpenseController } from "@/main/factory/controllers";
import { Router } from "express";

import { authorization } from "../middleware";

export default (router: Router): void => {
  router.post(
    "/expense/:travel_id",
    authorization,
    adaptRoute(makeAddExpenseController())
  );
};
