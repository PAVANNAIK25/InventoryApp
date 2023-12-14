
export const auth = (req, res, next)=>{
    if(req.session.userMail){
        next();
    }else{
        res.redirect("/login");
    }
}