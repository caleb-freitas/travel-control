import { adaptRoute } from "@/main/adapters";
import {
  makeCompanySignUpController,
} from "@/main/factory/controllers";
import { Router } from "express";

export default (router: Router): void => {
  router.post("/company", adaptRoute(makeCompanySignUpController()));
};
