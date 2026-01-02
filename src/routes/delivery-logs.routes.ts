import { Router } from "express";

import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";

import { ensureAuth } from "@/middlewares/ensure-auth";
import { verifyUserAuthorization } from "@/middlewares/verify-user.authorization";

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post(
    "/", 
    ensureAuth,
    verifyUserAuthorization(["sale"]),
    deliveryLogsController.create
);

deliveryLogsRoutes.get(
    "/:delivery_id/show",
    ensureAuth,
    verifyUserAuthorization(["sale", "customer"]),
    deliveryLogsController.show
);

export { deliveryLogsRoutes };