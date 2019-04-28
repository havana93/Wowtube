import  routes  from "../routes";
import  Video from "../models/Video";


export const home = async(req, res) => {
 try{
    const videos = await Video.find({}).sort({_id: -1}); //비디오를 최신순으로 정렬하기위해,여기서 -1은 순서를 바꾼다는의미.
    res.render("home", { pageTitle: "Home", videos }); 
} catch (error) {
     console.log(error);
     res.render("home", { pageTitle: "Home", videos:  [] });
 }
};
export const search = async(req, res) => {
    const {
        query: { term: searchingBy }
        } = req;
        let videos = [];  //videos의 정의
      try{
         videos = await Video.find({
           title: { $regex: searchingBy, $options: "i"}
          });                  //regex가 있음으로서 검색한단어를 포함한 데이터를 찾게된다.없으면 검색한.데이터만찾게됨.   
      } catch (error) {        // i는 insensitive의 약자로 덜 민감하다는의미.대소문자를 구별하지 않겟다는 구문.     
        console.log(error);
      }
        res.render("search", { pageTitle: "Search", searchingBy, videos });
           
 };



export const getUpload = (req, res) => 
  res.render("upload", { pageTitle: "Upload" });
 
export const postUpload = async(req, res) => {
   const {
    body: { title, description },
    file: { path}
   } = req;  
const newVideo = await Video.create({
       fileUrl: path,
       title,
       description
     });
     console.log(newVideo);
     res.redirect(routes.videoDetail(newVideo.id));  //mongoDB에서 자동적으로 ID를 할당한다.
 };

   


 export const videoDetail = async(req, res) => {
  const{
    params: { id }                          //parameter=ID, ID의 값이 query로 보내진다
  } = req;
  try{
  const video = await Video.findById(id);    //mongoose의 query함수 , 뜻:ID로찾기
 res.render("videoDetail", { pageTitle: "Video Detail", video }); //video:video는 video와같다
  } catch(error){
    console.log(error);
    res.redirect(routes.home);
  } 
};



export const getEditVideo = async (req, res) => {  //채워넣는작업
const {
  params: { id }
} =req;
try{
   const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error){
   res.redirect(routes.home);
 }
};

export const postEditVideo = async(req, res) => { //업데이트하는작업  
   const {
     params: { id },
     body: { title, description }   //videodetail(model의 video에서퍼온)에서 제목과설명을 가져온거임
   } = req;
   try {
      await Video.findOneAndUpdate({ _id: id }, { title, description }); // 1.const가 바로 안나오는이유: 그냥업데이트하면끝.거기서 받고싶은정보가없다.
      res.redirect(routes.videoDetail(id));                         // 2. 예전값과 수정한 새로운값의 업데이트때문에씀.
    } catch (error) {
      res.redirect(routes.home);
    }
  };




export const deleteVideo = async(req, res) => {
const {
   params: {id}
} = req;
try{
  await Video.findOneAndRemove({_id: id});
  res.redirect(routes.home);
} catch(error){}
   res.redirect(routes.home);
 
};
