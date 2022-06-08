const { List } = require("../databases/sqlite");

module.exports = {
      signin: signin,
      profile: profile,
      signup: signup,
    check:checkuser,
    checklogin:checklogin,
    remove:remove,
    edit:edit,
    editmade:editmade,
    done:done
    };
    
    function signin(req, res) {
        
      res.render("signin");

    }
    
    function signup(req, res) {
      res.render("signup");
    }

    function profile(req,res){
       // {id:req.session.user.id}
       console.log(req.session);
       List.findAll({
           attributes:['id','item'],
           where:{
               user_id:req.session.user.id
           }
       }).then(tasks=>{
        res.render("profile",{tasks:tasks});
       })
       
        
    }
    
    function checkuser(req,res,next){
        if(!req.session.user){
            res.redirect('/signin');
        }
        else{
            next();
        }
    }

    function checklogin(req,res,next){
        if(req.session.user){
            //{userid:req.session.user.id}
            //console.log("true");
           // res.render('profile');
           List.findAll({
            attributes:['id','item'],
            where:{
                user_id:req.session.user.id
            }
        }).then(tasks=>{
         res.render("profile",{tasks:tasks});
        })
           
           
        }
        else{
            next();
        }
    }

    function remove(req,res){
       const id=req.params.id;
        
        List.destroy({
            where:{
                id:id

            }

        }).then(t=>{
            console.log("succesfully deleted ",t);
            res.redirect('/')
        })
        
        
    }

    function edit(req,res){
        const id=req.params.id;
        List.findAll({
            attributes:['id','item'],
            where:{
                user_id:req.session.user.id
            }
        }).then(todo=>{
         res.render("edit",{todo:todo,editid:id});
        })
        
         
     }
    
     function editmade(req,res){
        const id=req.params.id;
        List.update({item:req.body.item,edit:true},{
            where:{
                id:id
            }

        }
     ).then(todo=>{
           console.log("updated succesfully")
           res.redirect('/');
     })

    }

    function done(req,res){
        const id=req.params.id;
        List.update({done:"completed"},{
            where:{
                id:id
            }
        }
        
        ).then(result=>{
            console.log(result);
            res.redirect('/');
        })
    }