const dbConn = require("../databases/sqlite.js");
const User = dbConn.User;
const session = require('express-session');
const bcrypt = require('bcrypt');
const { connect } = require("../../app.js");
const { List } = require("../databases/sqlite.js");
function signup(req, res) {

    const { name, email, password } = req.body;
    console.log(req.body)
     User.create({
         
         name,
         email,
        password

     }).then(user => {
         console.log(user,"You are now registered with us");

         req.session.user=user.dataValues;
         console.log(req.session.user);
         res.redirect('/');
         
         
     }).catch(err => {
         console.log(err);
         res.redirect('/signup');
     })
     
    
}


function signin(req, res) {
        email = req.body.email,
        password = req.body.password;
        console.log(email,password)
        

    User.findOne({ where: { email: email} }).then( function (user) {

        
       

        if (!user) {
            console.log("I'm in")
            res.redirect('/signin');
        } else {
           
            bcrypt.compare(password, user.password, function(err, result) {
            
                if(err) throw err
                else if(result){
                    console.log("user is logged")
                    req.session.user = {
                        id:user.dataValues.id
                    };
                    
                    //console.log(req.session.user)
                    user_id=user.dataValues.id;
                    res.redirect('/');


                }
                else{
                    console.log("wrong credentials")
                    res.redirect('/signin')
                }
                
  
              })

           
        }
    });
        
        
       
        
        
        
        
       
    

}

function signout(req,res){
  req.session.destroy(err=>{
      if(err) res.redirect('/')
      res.clearCookie('todo_sid');
      

      res.redirect('/signin')
      
  })
}

function add(req,res){
    
    const item=req.body.item;
    const edit=false;
    const done="done"
    
    const user_id=req.session.user.id;
    List.create({
        item,
        edit,
        done,
        user_id

    }).then(list=>{
       // req.session.list=list.dataValues
        //console.log(req.session)
        
        console.log(list);
       // res.render("profile",{items:list.dataValues.item})
       
        res.redirect('/',)
    })

}

module.exports={
    signup: signup,
    signin:signin,
    signout:signout,
    add:add
}