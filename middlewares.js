import multer from "multer";
import routes from "./routes";

const multerVideo= multer({ dest: "uploads/videos/"});  //destination, 미들웨어와 upload.pug의 연결구문,이걸위해 app.js에서 함수  static함수추가함.

export const localsMiddleware = (req, res, next) => {
res.locals.siteName = "WowTube";
res.locals.routes = routes;
res.locals.user = {
    isAuthenticated: true,
    id:1
  };
 next(); 
};

export const uploadVideo = multerVideo.single("videoFile");  
                                                             //single-오직 하나의 파일만 업로드가능.
                                                             //videofile은 upload의 파일 name과 연동된것.