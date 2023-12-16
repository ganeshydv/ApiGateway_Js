
module.exports.checkOk=(req,resp)=>{
    console.log(req.session.id);
    if(process.env.NODE_ENV==='production'){
        resp.send("<h1>Ok after adding compose --prod </h1>");
    }else resp.send("<h1>Ok after adding compose --dev new </h1>");
}