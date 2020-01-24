const express = require("express");
const router = express.Router();
const foodsCtrl = require("../controllers/foods");
const commentsCtrl = require("../controllers/comments");

router.get("/", foodsCtrl.index);
router.get("/new", foodsCtrl.new);
router.get("/:id", foodsCtrl.show);
router.get("/edit/:id", foodsCtrl.edit);
router.put("/edit/:id", foodsCtrl.update);
router.post("/", foodsCtrl.create);
router.post("/:id/comments", commentsCtrl.create);
router.delete("/:id", foodsCtrl.delete);

module.exports = router;
