import { Router } from "express";

import { adaptRoute } from "../adapters/express.routes.adapter";
import { makeCompanySignUpController } from "../factory/controllers/signup/company.signup.controller.factory";

export default (router: Router): void => {
  router.post("/company/signup", adaptRoute(makeCompanySignUpController()));
};
