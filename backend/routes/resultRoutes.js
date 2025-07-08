//result routes

import { Router } from "express";
import { createResult, getResults } from "../controllers/resultController.js";
import { protect } from "../middlewares/authMiddleware.js";

const resultRouter = Router();

resultRouter.post('/create',protect, createResult);
resultRouter.get('/get',protect,getResults);

export default resultRouter;