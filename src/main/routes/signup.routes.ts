import { adaptRoute } from "@/main/adapters";
import {
  makeCompanySignUpController,
  makeDriverSignUpController,
} from "@/main/factory/controllers";
import { authorization } from "@/main/middleware";
import { Router } from "express";

export default (router: Router): void => {
  router.post("/signup/company", adaptRoute(makeCompanySignUpController()));
  router.post(
    "/signup/driver",
    authorization,
    adaptRoute(makeDriverSignUpController())
  );
};
