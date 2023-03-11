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
          attributes: ['id','comment', 'date_created', 'tech_id', 'user_id'],
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


// retrieving the user data and associated blogs from the database in a single query

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbTechData = await Tech.findAll({
      //findAll Tech where user_id: req.session.user_id
      attributes: { exclude: ['password'] },
      include: [{ model: Tech }],
      order: [
        [{model: tech}, 'date_created', 'DESC'],
      ]
    });
    console.log(dbTechData)

    const tech = dbTechData.get({ plain: true });
    
    console.log(tech);

    res.render('dashboard', {
      ...tech,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// it takes the user to the page when they login

router.get('/tech/edit/:id', withAuth, async (req, res) => {

  try {
    const dbTechData = await Tech.findByPk(req.params.id);
    const tech = dbTechData.get({ plain: true });
    console.log("tech", tech)

    res.render("edit_id", {
      ...tech,
      loggedIn: req.session.logged_in,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});



router.get('/tech', withAuth, async (req, res) => {
  res.render('tech', {
    logged_in: req.session.logged_in
  });
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
