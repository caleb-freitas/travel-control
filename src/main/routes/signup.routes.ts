import { Router } from "express";

import { adaptRoute } from "../adapters/express.routes.adapter";
import { makeCompanySignUpController } from "../factory/controllers/company.signup.controller.factory";
import { makeDriverSignUpController } from "../factory/controllers/driver.signup.controller.factory";

export default (router: Router): void => {
  router.post("/signup/company", adaptRoute(makeCompanySignUpController()));
  router.post(
    "/signup/driver/:company_id",
    adaptRoute(makeDriverSignUpController())
  );
};
