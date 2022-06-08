const express=require('express')
var cookieParser = require("cookie-parser");

const session =require('express-session');
const app=express();
const path=require('path')
const routes=require('./backend/routes/mainroutes')
const cors=require('cors');
const compression = require("compression");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const one_hr=1000*60*60*5
const{
   PORT=3020,
   sess_age=one_hr,
   sess_name="todo_sid"
}=process.env

app.set("views",path.join(__dirname,"client/views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "/client/css/")));
app.use(express.static(path.join(__dirname, "/client/assets/")));
app.use(cors());
app.use(morgan("dev"))
app.use(compression());
app.use(cookieParser());


app.use(express.urlencoded());
app.use(express.json());


app.use(session({
   name:sess_name,
   // key:'user_sid',
   resave:false,
   saveUninitialized:false,
   secret: "KonfinitySecretKey",
   cookie:{
     maxAge:sess_age,
     sameSite:true

   }
}))

/*app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});*/





app.use('/',routes);
//app.use('/signup',session)
app.use('/signin',session)



app.listen(PORT,(err)=>{
   if (err) console.log(err)
   console.log("server is up and running");
})


    module.exports=app;
