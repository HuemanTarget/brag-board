const express = require("express");
const router = express.Router();
const bodysCtrl = require("../controllers/bodys");
const commentsCtrl = require("../controllers/comments");

router.get("/", bodysCtrl.index);
router.get("/new", bodysCtrl.new);
router.get("/:id", bodysCtrl.show);
router.get("/edit/:id", bodysCtrl.edit);
router.put("/edit/:id", bodysCtrl.update);
router.post("/", bodysCtrl.create);
router.post("/:id/comments", commentsCtrl.create);
router.delete("/:id", bodysCtrl.delete);

module.exports = router;