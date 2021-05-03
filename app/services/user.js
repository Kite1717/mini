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
app.post("/new", async (req, res) => {
  const { user: data } = req.body;

  let password = bcrypt.hashSync(
    data.email.substr(5),
    Number.parseInt(authConfig.rounds)
  );

  // Create a user,
  db.User.findOne({ where: { email: data.email }, paranoid: false }).then(
    (user) => {
      if (user && user.deletedAt !== null) {
        db.User.update(
          {
            fullName: data.fullName,
            email: data.email,
            password: password,
            address: data.address,
            updatedAt: new Date(),
            deleterUserId: null,
            deletedAt: null,
          },
          { where: { id: user.id }, paranoid: false, returning: true }
        )
          .then(() => {
            db.User.findOne({ where: { id: user.id } })
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
          })
          .catch((err) => {
            return res.status(500).json(err);
          });
      } else {
        db.User.create({
          fullName: data.fullName,
          email: data.email,
          role: Number(data.role),
          password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
          .then((user) => {
            // We create the token
            let token = jwt.sign({ user: user }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });

            return res.json({
              user: user,
              token: token,
            });
          })
          .catch((err) => {
            return res.status(500).json(err);
          });
      }
    }
  );
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
