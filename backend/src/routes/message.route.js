import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/user", protectRoute, getUsersForSidebar)

router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage)



export default router;