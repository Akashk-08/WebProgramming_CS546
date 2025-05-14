// Set-Up Routes
import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname,"../static/webpage.html"));
});

export default router;
