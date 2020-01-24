var Game = require("../model/brag");

const create = (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    game.comments.push(req.body);
    game.save(err => {
      res.redirect(`/games/${game._id}`);
    });
  });
};

module.exports = {
  create
};
