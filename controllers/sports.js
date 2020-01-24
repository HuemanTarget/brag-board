const Sport = require('../model/brag')
const User = require('../model/user')

const index = (req, res) => {
  Sport.find({}, async (err, sports) => {
    if(err){
      return res.redirect('/sports/new')
    } 
    else{
      const sortedSports = sports.sort((a, b) => (a.date > b.date) ? 1 : -1)
    res.render('sports/index', { 
      title: 'All Sport Brags', 
      user: req.user,
      sports
    })
  }
  })
}

const show = (req, res) => {
    Sport.findById(req.params.id)
    .populate('user')
    .exec((err, sport) => {
        console.log(sport)
    res.render('sports/show', {
    title: 'Sport Brag Detail',
    id: req.params.id,
    user: req.user,
    sport,
        })
    })
}


const newBrag = (req, res) => {
  res.render('sports/new', { 
    title: 'Add Sport Brag',
    user: req.user,
  })
}

const deleteBrag = (req, res) =>{
    Sport.findByIdAndDelete({_id:req.params.id}, (err, sport)=>{
        if(err){
            return res.redirect('/sports')
        } 
        else{
            res.redirect('/sports');
             
        }
    })
}

const create = (req, res) => {
    // console.log(req.user._id)
    User.findById(req.user._id, async (err, user) => {
        console.log(user)
        for (let key in req.body) {
            if (req.body[key] === '') delete req.body[key]
        }
        console.log(req.body)
        let sport = await new Sport(req.body)
        user.brags.push(sport)
        await user.save()
        sport.user.push(user)
        await sport.save()
        res.redirect(`/sports`)
    })


    
  }


const edit = (req, res) => {
    Sport.findById(req.params.id, (err, sport) => {
        res.render('sports/edit',{
            id: req.params.id,
            user: req.user,
            sport,
        })
    })
}

const update = (req, res) => {
    Sport.findByIdAndUpdate(req.params.id, req.body, (err, result) => {

            if(err){
                console.log(err);
            }
            console.log("RESULT: " + result);
            res.redirect('/sports/');
        });
    };

module.exports = {
  index,
  show,
  new: newBrag,
  create,
  delete: deleteBrag,
  edit,
  update,
}
