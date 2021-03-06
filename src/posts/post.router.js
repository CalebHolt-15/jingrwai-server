import { Router } from "express";
import controllers from "./post.controller";

const router = Router();

router.route("/").get(controllers.getAll).post(controllers.createOne);

router
  .route("/:id")
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
