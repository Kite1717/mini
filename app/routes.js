const user = require("./services/user");
const blog = require("./services/blog");
const code = require("./services/code");
const book = require("./services/book");
const bookEx = require("./services/bookEx");
const userStat = require("./services/userStat");
const answers = require("./services/answers");
const report = require("./services/report");

const express = require("express");
const router = express.Router();

// Home Default
router.get("/", (req, res) => res.json({ KITE: "ACTIVE" }));

//uploads
router.use("/files", express.static("uploads"));

/**********SERVICES********/
router.use("/api/user", user);
router.use("/api/blog", blog);
router.use("/api/book", book);
router.use("/api/code", code);
router.use("/api/book-ex", bookEx);
router.use("/api/user-stat", userStat);
router.use("/api/answers", answers);
router.use("/api/report", report);
/**************************/

module.exports = router;
