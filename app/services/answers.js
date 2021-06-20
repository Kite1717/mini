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
app.post("/check", async (req, res) => {
  const { userId, exerciseId } = req.body;

  db.Answer.findOne({
    where: {
      userId,
      exerciseId,
    },
  })
    .then((ans) => {
      if (!ans) {
        // not found
        return res.json({
          status: 0,
        });
      } else if (ans && ans.isTrue) {
        // correct
        return res.json({
          status: 1,
        });
      } else if (ans && !ans.isTrue) {
        // wrong
        return res.json({
          status: 2,
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

app.post("/upsert", async (req, res) => {
  const { userId, exerciseId, status } = req.body;

  db.Answer.findOne({
    where: {
      userId,
      exerciseId,
    },
  })
    .then((ans) => {
      if (!ans) {
        //  create
        db.Answer.create({ userId, exerciseId, isTrue: status });
      } else {
        // update
        db.Answer.update(
          { isTrue: status },
          {
            where: {
              userId,
              exerciseId,
            },
          }
        );
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
