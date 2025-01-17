import express, { Router } from "express";
import { checkAuth } from "../middlewares/auth";
import { createRoom } from "../controllers/roomControllers";

const router: Router = express.Router();

router.post("/", checkAuth, createRoom);

export default router;
