import multer from "multer";
import routes from "./routes";

const multerVideo= multer({ dest: "uploads/videos/"});      

export const localsMiddleware = (req, res, next) => {
res.locals.siteName = "WowTube";                            //locals 기능을 사용하여 app.use로 보내면 그 뒤에있는 router에서 전역변수로 사용할수있다.
res.locals.routes = routes;
res.locals.user = req.user || {};                            //passport에서 만들어준 이 값이 템플릿으로 뿌려짐.//
next(); 
};

export const uploadVideo = multerVideo.single("videoFile");  
                                                             //single-오직 하나의 파일만 업로드가능.//
                                                             //videofile은 upload의 파일 name과 연동된것.//