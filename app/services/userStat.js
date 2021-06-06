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





//get user book ex by id
app.get(
  "/:userId",
  async (req, res) => {
   


    db.UStat.findAll({
      where:{
        userId :  req.params.userId,
     
        
      },
     
    })
    .then((ex) => {
      return res.json({
        type: true,
        ex,
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



module.exports = app;
