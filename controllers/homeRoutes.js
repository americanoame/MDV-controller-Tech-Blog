const router = require('express').Router();
const { Tech, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get("/", async (req, res) => {
  const dbTechData = await Tech.findAll({
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  });

  const techs = dbTechData.map((tech) =>
    tech.get({ plain: true })
  );
  res.render('homepage', { techs, loggedIn: req.session.logged_in });
})

router.get('/tech/:id', withAuth, async (req, res) => {
  try {
    const dbTechData = await Tech.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["comment", "data", "user id"],
        },
      ],
    });
    const tech = dbTechData.get((tech) =>
      tech.get({ plain: true })
    );
    // res.render("homepage", { dbTechData });
    // try to get the user data here
    res.render('homepage', {
      tech,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// i have to do this part to be able to open the l

// router.get('/dashboard', withAuth, async (req, res) => {

//   res.render('dashboard', {

//     logged_in: req.session.logged_in,
//   });
// });

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbTechData = await Tech.findAll({
      //findAll Tech where user_id: req.session.user_id
      where: {
        user_id: req.session.user_id
      }
    });
    // let blogs;
    // if (dbTechData.length > 1) {
    // const blogs = dbTechData.get({ plain: true });
    const techs = dbTechData.map((tech) => {
      tech.get({ plain: true });
    });
    // const techs = dbTechData;
    // } else {
    //   blogs = dbTechData.get({ plain: true });
    // }
    console.log(techs);

    res.render('dashboard', {
      techs,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// it takes the user to the page when they login

router.get('/tech/edit/:id', withAuth, async (req, res) => {

  // find user by id
  try {
    const dbTechData = await Tech.findOne({
      where: {
        id: req.params.id
      },

      attributes: ["comment", "data", "user id"],
      include: [
        {
          model: Comment,
          attributes: ["comment", "data", "user id"],
        }
      ],
    })

    const tech = dbTechData.get((tech) => {
      tech.get({ plain: true });
    });

    res.render("dashboard", {
      tech,
      loggedIn: req.session.logged_in,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/painting/:id', withAuth, async (req, res) => {

  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {

    try {
      const dbPaintingData = await Painting.findByPk(req.params.id);

      const painting = dbPaintingData.get({ plain: true });

      res.render('painting', { painting, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');

  router.get('/lgout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.redirect('/');
        return;
      });
    } else {
      res.status(404).end;
    }
  });

});


router.get('/new', (req, res) => {


  res.render('new-post');
});





module.exports = router;
