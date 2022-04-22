import { adaptRoute } from "@/main/adapters";
import {
  makeAddTravelController,
  makeLoadOpenTravelsController,
  makeFinishTravelController,
} from "@/main/factory/controllers";
import { authorization } from "@/main/middleware";
import { Router } from "express";

export default (router: Router): void => {
  router.post(
    "/travel/:driver_id/:truck_id",
    authorization,
    adaptRoute(makeAddTravelController())
  );

  router.patch(
    "/travel/:id",
    authorization,
    adaptRoute(makeFinishTravelController())
  );

  router.get(
    "/travel/open",
    authorization,
    adaptRoute(makeLoadOpenTravelsController())
  );
};
