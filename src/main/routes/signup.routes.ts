import { Router } from "express";

import { adaptRoute } from "../adapters/express.routes.adapter";
import { makeCompanySignUpController } from "../factory/controllers/signup/company.signup.controller.factory";
import { makeDriverSignUpController } from "../factory/controllers/signup/driver.signup.controller.factory";

export default (router: Router): void => {
  router.post("/company/signup", adaptRoute(makeCompanySignUpController()));

  router.post("/driver/signup", adaptRoute(makeDriverSignUpController()));
};
