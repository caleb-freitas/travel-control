import { adaptRoute } from "@/main/adapters";
import { makeDriverSignUpController } from "@/main/factory/controllers";
import { authorization } from "@/main/middleware";
import { Router } from "express";
import { makeLoadDriversController } from "../factory/controllers/driver/load.drivers";

export default (router: Router): void => {
  router.post(
    "/driver",
    authorization,
    adaptRoute(makeDriverSignUpController())
  );
  router.post("/drivers", adaptRoute(makeLoadDriversController()));
};
