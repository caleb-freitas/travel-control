import { Router } from "express";

import { adaptRoute } from "../adapters/express.routes";
import { makeCompanySignUpController } from "../factory/controllers/company.signup.controller.factory";
import { makeDriverSignUpController } from "../factory/controllers/driver.signup.controller.factory";
import { authentication } from "../middleware/authentication";

export default (router: Router): void => {
  router.post("/signup/company", adaptRoute(makeCompanySignUpController()));
  router.post(
    "/signup/driver",
    authentication,
    adaptRoute(makeDriverSignUpController())
  );
};
