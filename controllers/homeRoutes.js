const router = require('express').Router();
const { Tech, Comment, User } = require('../models');
const withAuth = require('../utils/auth');


router.get("/", async (req, res) => {
  const dbTechData = await Tech.findAll({
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
    order: [
      ['date_created', 'DESC']
    ]
  });

  const techs = dbTechData.map((tech) =>
    tech.get({ plain: true })
  );

  res.render('homepage', {
    techs,
    loggedIn: req.session.logged_in
  });

})

router.get('/tech/:id', async (req, res) => {
  try {
    const dbTechData = await Tech.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [
        {
          model: Comment,
          attributes: ['id','comment', 'date_created', 'blog_id', 'user_id'],
          include: {
            model: User,
            attributes:['name']
          }
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
      order: [
        [{model: Comment}, 'date_created', 'DESC'],
      ]
    });

    const tech = dbTechData.get({ plain: true });
    console.log("tech", tech);


    res.render('tech-details', {
      ...blog,
      logged_in: req.session.logged_in
    });

  } catch (err) {
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
    console.log(dbTechData)
    // let blogs;
    // if (dbTechData.length > 1) {
    // const blogs = dbTechData.get({ plain: true });
    const techs = dbTechData.map((tech) => tech.get({ plain: true }));
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

      attributes: ["title", "content", "date_created"],
      include: [
        {
          model: Comment,
          attributes: ["title", "content", "user_id"],
        }
      ],
    })

    const tech = dbTechData.get((tech) => {
      tech.get({ plain: true });
    });

    res.render("edit-post", {
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


router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
      return;
    });
  } else {
    res.status(404).end;
  }
});


router.get('/new', (req, res) => {


  res.render('new-post');
});





module.exports = router;
