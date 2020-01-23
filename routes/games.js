const express = require("express");
const router = express.Router();
const gamesCtrl = require("../controllers/games");
const commentsCtrl = require('../controllers/comments');


router.get("/", gamesCtrl.index);
router.get("/new", gamesCtrl.new);
router.get("/:id", gamesCtrl.show);
router.get('/edit/:id', gamesCtrl.edit)
router.put('/edit/:id', gamesCtrl.update)
router.post("/", gamesCtrl.create);
router.post('/:id/comments', commentsCtrl.create);
router.delete('/:id', gamesCtrl.delete);


module.exports = router;
