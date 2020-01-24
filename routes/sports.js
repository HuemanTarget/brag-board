const express = require("express");
const router = express.Router();
const sportsCtrl = require("../controllers/sports");
const commentsCtrl = require("../controllers/comments");

router.get("/", sportsCtrl.index);
router.get("/new", sportsCtrl.new);
router.get("/:id", sportsCtrl.show);
router.get("/edit/:id", sportsCtrl.edit);
router.put("/edit/:id", sportsCtrl.update);
router.post("/", sportsCtrl.create);
router.post("/:id/comments", commentsCtrl.create);
router.delete("/:id", sportsCtrl.delete);

module.exports = router;
