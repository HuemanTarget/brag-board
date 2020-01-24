const Body = require("../model/brag");
const User = require("../model/user");

const index = (req, res) => {
  Body.find(
    { body: { $in: ['Longest', 'Shortest', 'Tallest', 'Heaviest', 'Oldest', 'Youngest', 'Most....'] } },
    async (err, bodys) => {
      if (err) {
        return res.redirect("/bodys/new");
      } else {
        const sortedBodys = bodys.sort((a, b) => (a.date > b.date ? 1 : -1));
        res.render("bodys/index", {
          title: "All Human Body Brags",
          user: req.user,
          bodys
        });
      }
    }
  );
};

const show = (req, res) => {
  Body.findById(req.params.id)
    .populate("user")
    .exec((err, body) => {
      res.render("bodys/show", {
        title: "Human Body Brag Detail",
        id: req.params.id,
        user: req.user,
        body
      });
    });
};

const newBrag = (req, res) => {
  res.render("bodys/new", {
    title: "Add Human Body Brag",
    user: req.user
  });
};

const deleteBrag = (req, res) => {
  Body.findByIdAndDelete({ _id: req.params.id }, (err, body) => {
    if (err) {
      return res.redirect("/bodys");
    } else {
      res.redirect("/bodys");
    }
  });
};

const create = (req, res) => {
  User.findById(req.user._id, async (err, user) => {
    for (let key in req.body) {
      if (req.body[key] === "") delete req.body[key];
    }
    let body = await new Body(req.body);
    user.brags.push(body);
    await user.save();
    body.user.push(user);
    await body.save();
    res.redirect(`/bodys`);
  });
};

const edit = (req, res) => {
  Body.findById(req.params.id, (err, body) => {
    res.render("bodys/edit", {
      id: req.params.id,
      user: req.user,
      body
    });
  });
};

const update = (req, res) => {
  Body.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("RESULT: " + result);
    res.redirect("/bodys/");
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
