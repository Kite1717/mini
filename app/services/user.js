const express = require("express");
const db = require("../models");
const Op = db.Sequelize.Op;

// Middlewares
const auth = require("../middlewares/auth");

//auth
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

//Roles
const { UserRolls } = require("../helpers/enum");

const app = express.Router();

//**************Route Level 1




//get user by id
app.get(
  "/me",auth([UserRolls.Admin,UserRolls.User]),
  async (req, res) => {
   
    if(req.user)
    {
      return res.json({
        status:1,
        user: req.user,
      });
    }
    else{
      return res.status(401).json({ msg: "There is no matching" });
    }
  }
);

//get user by id
app.get(
  "/:id",
  async (req, res) => {
    const id = req.params.id;
    db.User.findOne({ where: { id } })
      .then((result) => {
        result.isTipAdmin = result.isTipAdmin ? "1" : "0";

        return res.json({
          type: true,
          user: result,
        });
      })
      .catch((e) => {
        return res.json({
          type: false,
          data: e.toString(),
        });
      });
  }
);



// update password
app.put("/change-password",auth([UserRolls.Admin,UserRolls.User]), async (req, res) => {

  let { oldPass,newPass} = req.body;

  console.log(oldPass,newPass)
  // Search user
  db.User.findOne({
    where: {
      email : req.user.email,
    },
  })
    .then((user) => {
        if (bcrypt.compareSync(oldPass, user.password)) {


          // new password hashing
          let uptPassword = bcrypt.hashSync(
            newPass,
            Number.parseInt(authConfig.rounds)
          );
          db.User.update({

            password : uptPassword,
          },{
            where:{
              email : req.user.email
            },
            returning: true,
          }).then((newUser)=>{

             //We create the token
            let token = jwt.sign({ user: newUser }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });

            newUser.password = ""
            
            return res.json({
              user: newUser,
              token: token,
            });

          }).catch((err)=>{
            return res.status(500).json(err);
          })
         
        } else {
          // Unauthorized Access
          return res.status(401).json({ msg: "There is no matching" });
        }

    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});




//update user
app.put(
  "/:id",
  async (req, res) => {
    const id = req.params.id;

    let password = bcrypt.hashSync(
      req.body.user.email.substr(5),
      Number.parseInt(authConfig.rounds)
    );
    req.body.user.password = password;
    db.User.update(req.body.user, { where: { id: id }, paranoid: false })
      .then((result) => {
        return res.json({
          type: true,
          data: "User Updated",
        });
      })
      .catch((e) => {
        return res.status(500).json({
          type: false,
          data: e.toString(),
        });
      });
  }
);

//sign up
app.post("/register", async (req, res) => {
  const data = req.body;

  let password = bcrypt.hashSync(
    data.password,
    Number.parseInt(authConfig.rounds)
  );
  db.User.create({
    fullName: data.fullName,
    email: data.email,
    role: 1,
    password: password,
    username : data.username
  })
    .then((user) => {
      // We create the token
      let token = jwt.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires,
      });

      user.password  = ""

      db.UStat.bulkCreate([
        {
          userId:user.id,
          attainmentName: "DİL BECERİSİ",
          attainmentAmount : 0,
          attainmentDes : "İçinde bulunulan gelişim basamağına uygun olarak çıkarılan sesleri ve üretilen sözel ifadelerin gelişimini ifade etmektedir. Sözel akıcılık ve kelimeleri kullanma becerisini de kapsamaktadır.",

        },
        {
          userId:user.id,
          attainmentName: "BÜTÜNSEL & GÖRSEL ALGI",
          attainmentAmount : 0,
          attainmentDes : "Görsel işlemleme, akıl yürütme, uyaranın bütün olarak değerlendirilmesini ifade etmektedir.",
          
        },
        {
          userId:user.id,
          attainmentName: "PARÇA BÜTÜN İLİŞKİSİ",
          attainmentAmount : 0,
          attainmentDes : "Soyut akıl yürütme, görsel uyaranın daha küçük bir parçası ve bütünü arasındaki ilişkiyi kavrama becerisini ifade etmektedir.",
          
        },
        {
          userId:user.id,
          attainmentName: "AYIRT ETME & ORGANİZASYON",
          attainmentAmount : 0,
          attainmentDes : "Görsel uyaranların birbirinden farklılaştıkları özellikleri algılamayı ve bunlara göre bir yapı oluşturmayı ifade etmektedir.",
          
        },
        {
          userId:user.id,
          attainmentName: "UZUN SÜRELİ DİKKAT",
          attainmentAmount : 0,
          attainmentDes : "Dikkat ve konsantrasyonun belli bir uyaran üzerinde uzun süre sürdürülmesini ifade etmektedir.",
          
        },
      ])
      .then(() => {
        return res.json({
          user: user,
          token: token,
        });
      })
      .catch((e) => {
        return res.status(500).json(e);
      });
     
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// Login
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  // Search user
  db.User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          //We create the token
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });

          user.password = ""
          
          return res.json({
            user: user,
            token: token,
          });
        } else {
          // Unauthorized Access
          return res.status(401).json({ msg: "Incorrect password" });
        }

    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});


app.post("/login-admin", async (req, res) => {
  let { email, password } = req.body;
  // Search user
  db.User.findOne({
    where: {
      email,
      role:0,
    },
  })
    .then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          //We create the token
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });

          user.password = ""
          
          return res.json({
            user: user,
            token: token,
          });
        } else {
          // Unauthorized Access
          return res.status(401).json({ msg: "Incorrect password" });
        }

    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});



module.exports = app;
