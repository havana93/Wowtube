import express from "express";
import routes from "../routes";
import {
    getUpload,
    postUpload,
    videoDetail,
    getEditVideo,
    postEditVideo,
    deleteVideo
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";


const videoRouter = express.Router();  
 //parameter를 쓰는이유가 여기있다. express는 parameter를 원하지 ID를 원하는게 아니거든.그래서 빈칸에 숫자를넣어도 반영X


 
// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

//Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

//Delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo);


export default videoRouter;
 