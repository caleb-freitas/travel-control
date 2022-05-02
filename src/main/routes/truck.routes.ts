import { adaptRoute } from "@/main/adapters";
import { makeAddTruckController } from "@/main/factory/controllers";
import { authorization } from "@/main/middleware";
import { Router } from "express";

export default (router: Router): void => {
  router.post("/truck", authorization, adaptRoute(makeAddTruckController()));
};
