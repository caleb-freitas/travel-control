import { adaptRoute } from "@/main/adapters";
import { makeAddTruckController } from "@/main/factory/controllers";
import { Router } from "express";

import { authorization } from "../middleware";

export default (router: Router): void => {
  router.post("/truck", authorization, adaptRoute(makeAddTruckController()));
};
