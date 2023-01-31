import { Router } from "express";
const router = Router();
import regex from "./regexmatch/middleware.js";

router.use("/regex", regex);

export default router;