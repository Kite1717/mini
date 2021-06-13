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

//file uploads handler
const upload = require("../helpers/upload");

const app = express.Router();

//**************Route Level 1

//get user book ex by id
app.get("/:bookId", async (req, res) => {
  db.BookEx.findAll({
    order: [["id", "ASC"]],
    where: {
      bookId: req.params.bookId,
    },
    include: [
      {
        model: db.Book,
        as: "books",
        required: true,
      },
    ],
  })
    .then((bookex) => {
      return res.json({
        type: true,
        bookex: bookex,
      });
    })
    .catch((e) => {
      return res.json({
        type: false,
        data: e.toString(),
      });
    });
});

app.post("/add-exercise", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        type: false,
        data: "No file is selected.",
      });
    }
    
    let { data } = req.body;
    
    data =  JSON.parse(data)  // converting

    data.exerciseImg = 'files/' + file.filename;
  
    db.BookEx.create(data).then(() => {
      return res.json({
        type: true,
      });
    }).catch((e)=>{

      console.log(JSON.stringify(e,null,2),"wwwwwwww")
      return res.status(500).json({
        type: false,
        data : e.toString()
      });
    })
  } catch (err) {
    return res.status(500).json({
      type: false,
    });
  }
});



app.delete("/:id", async (req, res) => {
  db.BookEx.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      return res.json({
        type: true,
      });
    })
    .catch((e) => {
      return res.json({
        type: false,
        data: e.toString(),
      });
    });
});
module.exports = app;
