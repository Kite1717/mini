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
app.get("/:userId", async (req, res) => {
  db.UStat.findAll({
    where: {
      userId: req.params.userId,
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
});

app.put("/stat-update", async (req, res) => {
  const { amount, userId, name } = req.body;

  db.UStat.findOne({
    where: {
      userId,
      attainmentName: name.trim(),
    },
  })
    .then((att) => {

        if(att)
        {

            db.UStat.update(
                {
                  attainmentAmount: att.attainmentAmount + amount,
                },
                {
                  where: {
                    userId,
                    attainmentName: name.trim(),
                  },
                }
              )
                .then((ret) => {
                  return res.json({
                    type: true,
                    ret,
                  });
                })
                .catch((e) => {
                  return res.json({
                    type: false,
                    data: e.toString(),
                  });
                });
        }
        else{
            return res.json({
                type: false,
                data:"not found",
              });
        }
    
    })
    .catch((e) => {
      return res.json({
        type: false,
        data: e.toString(),
      });
    });
});

module.exports = app;
