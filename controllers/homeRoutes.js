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
          attributes: ['id', 'content', 'date_created', 'tech_id', 'user_id'],
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
      ...tech,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbTechData = await Tech.findAll({
      
      
      
      where: {
        user_id: req.session.user_id
      }
    });
    console.log(dbTechData)

    
    const techs = dbTechData.map((tech) => tech.get({ plain: true }));
    
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

  try {
    const dbTechData = await Tech.findByPk(req.params.id);
    const tech = dbTechData.get({ plain: true });
    console.log("tech", tech)

    res.render("edit-post", {
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
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
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
