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






//get total book count
app.get(
  "/total-book-count",
  async (req, res) => {



    db.Book.findAll()
    .then((books) => {
      return res.json({
        type: true,
        count : books.length
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

//get total user book count
app.get(
    "/total-user-book-count/:userId",
    async (req, res) => {
  
  
  
      db.UBook.findAll({
          where:{
            userId:req.params.userId
          }
      })
      .then((books) => {
        return res.json({
          type: true,
          count : books.length
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
