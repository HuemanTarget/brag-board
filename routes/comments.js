var express = require('express');
var router = express.Router();

var commentsCtrl = require('../controllers/comments');

/* router.get('/', (req,res)=>{
    res.redirect('/games')
}) */

router.post('/games/:id/comments', commentsCtrl.create);

module.exports = router;