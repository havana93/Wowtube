import passport from "passport"; //passport-local-mongoose가 제공하는 strategy를 쓸것이다.//
import User from "./models/User";

passport.use(User.createStrategy());                
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 //passport 자체함수를 사용.
 //serialiszation:어떤 정보를 쿠키에게 주느냐,어떤field가 쿠키에 포함될것인지 알려줌.//
 //deserizalizeUser:어떤 사용자인지 어떻게찾는가?//
 //이 2개는 passport mongoose에 베이스설정되있다.//
                                                  