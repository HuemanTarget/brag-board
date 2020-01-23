var Game = require('../model/brag')

const create = (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    
    game.comments.push(req.body)
    game.save(err => {
      res.redirect(`/games/${game._id}`)
    })
  })
}

module.exports = {
  create,
}

/* User.findById(req.user._id, async (err, user) => {
    console.log(user)
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    console.log(req.body)
    let game = await new Game(req.body)
    user.brags.push(game)
    await user.save()
    game.user.push(user)
    await game.save() */