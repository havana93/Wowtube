import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport"; 
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport"; //파일.js//


const app = express(); //이걸 중심으로 시작됨.//


app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));//directory에서 파일을보내주는 미들웨어(id나 타이틀은 보지않고 파일만 확인함)//
app.use("/static", express.static("static")); //서버에 static경로의 존재를알려주는구문//
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize()); //위에서 cookie parser가 쿠키를 데려와서 여기서 해당사용자에게 분배.//
app.use(passport.session()); //+ 찾은 그 사용자의 요청을 req.user로 만들어줌.//

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);



export default app;