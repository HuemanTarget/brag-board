const Food = require("../model/brag");
const User = require("../model/user");

const index = (req, res) => {
  Food.find(
    {
      food: {
        $in: ["Fastest Eating", "Largest Food", "Heaviest Food", "Most..."]
      }
    },
    async (err, foods) => {
      if (err) {
        return res.redirect("/foods/new");
      } else {
        const sortedFoods = foods.sort((a, b) => (a.date > b.date ? 1 : -1));
        res.render("foods/index", {
          title: "All Food Brags",
          user: req.user,
          foods
        });
      }
    }
  );
};

const show = (req, res) => {
  Food.findById(req.params.id)
    .populate("user")
    .exec((err, food) => {
      res.render("foods/show", {
        title: "Food Brag Detail",
        id: req.params.id,
        user: req.user,
        food
      });
    });
};

const newBrag = (req, res) => {
  res.render("foods/new", {
    title: "Add Food Brag",
    user: req.user
  });
};

const deleteBrag = (req, res) => {
  Food.findByIdAndDelete({ _id: req.params.id }, (err, food) => {
    if (err) {
      return res.redirect("/foods");
    } else {
      res.redirect("/foods");
    }
  });
};

const create = (req, res) => {
  User.findById(req.user._id, async (err, user) => {
    for (let key in req.body) {
      if (req.body[key] === "") delete req.body[key];
    }
    let food = await new Food(req.body);
    user.brags.push(food);
    await user.save();
    food.user.push(user);
    await food.save();
    res.redirect(`/foods`);
  });
};

const edit = (req, res) => {
  Food.findById(req.params.id, (err, food) => {
    res.render("foods/edit", {
      id: req.params.id,
      user: req.user,
      food
    });
  });
};

const update = (req, res) => {
  Food.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("RESULT: " + result);
    res.redirect("/foods/");
  });
};

module.exports = {
  index,
  show,
  new: newBrag,
  create,
  delete: deleteBrag,
  edit,
  update
};
