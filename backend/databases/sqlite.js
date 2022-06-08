const path=require('path');

            const Sequelize = require('sequelize');
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: path.join(__dirname,"database.sqlite")
    });
    const users = sequelize.define("users", {
          name: {
            type: Sequelize.STRING,
           
          },
          email: {
            type: Sequelize.STRING,
            unique: true,


          },
          password: {
            type: Sequelize.STRING,


          }},
        {
            hooks: {
              beforeCreate: (user) => {
                /*const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);*/
                return new Promise((res,rej)=>{

                  bcrypt.hash(user.password, saltRounds, function(err, hash) {
                    // Store hash in your password DB.
                    if(err) return rej(err)
                    user.password=hash;
                    return res(user)
                });
  

                })

               
              }
            },
           
              
        });
        sequelize
          .sync()
          .then(() =>
            console.log(
              "users table has been successfully created, if one doesn't exist"
            )
          )
          .catch(error => console.log("This error occurred"));

       
        

        const lists = sequelize.define("lists", {
              item: {
                type: Sequelize.STRING,
                allowNull: false
              },
              edit: {
                type: Sequelize.BOOLEAN,
               allowNull: false
                
                
              },
              done: {
                type: Sequelize.STRING,
               allowNull: false
                
              },
            user_id:{
                type: Sequelize.BOOLEAN,
               allowNull: false
            }

            });
            sequelize
          .sync()
          .then(() =>
            console.log(
              "lists table has been successfully created, if one doesn't exist"
            )
          )
          .catch(error => console.log("This error occurred"));
        module.exports = {
              User: users,
            List:lists
            };
                            