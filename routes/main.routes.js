import Router from "express";
import { upload, uploadVtt } from "../middleware/main.middleware.js";
import {
  getAllFiles,
  getSubFile,
  getVideoStream,
  saveFile,
} from "../controllers/main.controllers.js";
const routes = Router();

routes.get("/", getAllFiles);

routes.get("/filestream/:id", getVideoStream);
routes.get("/filestreamsub/:id", getSubFile);

routes.post("/", [upload.single("video"), uploadVtt], saveFile);

export default routes;
