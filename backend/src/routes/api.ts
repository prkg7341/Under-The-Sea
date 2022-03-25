import { Router } from "express";
import userRouter from "./user-router";
import marketRouter from "./market-router";
import searchRouter from "./search-router";
import followRouter from "./follow-router";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/user", userRouter);
baseRouter.use("/market", marketRouter);
baseRouter.use("/search", searchRouter);
baseRouter.use("/artist", followRouter);

// Export default.
export default baseRouter;
