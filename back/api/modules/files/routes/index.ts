import { Router } from "express";
import { uploadFile, searchUsers } from "../controller";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/api/files", upload.single("file"), uploadFile);
router.post("/api/files", searchUsers);

export default router;
