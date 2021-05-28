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





app.get(
  "/all",
  async (req, res) => {
   
    db.Book.findAll()
    .then((books) => {
      return res.json({
        type: true,
        books,
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

//get user book by id
app.get(
  "/:userId",
  async (req, res) => {
   

    
    console.log(req.params,"wwww")
    db.UBook.findAll({
      where:{
        userId :  req.params.userId
      },
      include : [{
        model: db.Book,
        as : "books",
        required: true
       }]
    })
    .then((ubook) => {
      return res.json({
        type: true,
        ubook: ubook,
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
