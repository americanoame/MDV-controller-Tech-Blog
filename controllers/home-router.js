const router = require('express').Router();
const { Project, Comment, User } = require('../models');

const withAuth = (req, res, next) => {
// if the user is not logged in, redirect the user to
// the login page
// this is directly from the /gallery:id routes

  if (!req.session.loggedIn) {      // insted of put on the auth folder i can externalize
    res.redirect('/login');        // doing this way, it will become a function therefor 
  } else {                         // i will not need the auth folder
    
// if the user is logged in, execute the route fuction
// that will alow to view the dashboard
// we can call next if the user is authenticated    
    next()
  }
};

// GET all galleries for homepage
router.get("/", async (req, res) => {
  const mdv = await Project.findAll({
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
}),



 

router.get('/project/:id', withAuth, async (req, res) => {
  try {
    const dbGalleryData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["comment", "data", "user id"],
        },
      ],
    });


  // try to get the user data here



    const galleries = dbGalleryData.map((gallery) =>
      gallery.get({ plain: true })
    );

    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});





router.get('/gallery/:id', withAuth, async (req, res) => {
  
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
  
    try {
      const dbGalleryData = await Gallery.findByPk(req.params.id, {
        include: [
          {
            model: Painting,
            attributes: [
              'id',
              'title',
              'artist',
              'exhibition_date',
              'filename',
              'description',
            ],
          },
        ],
      });
      const gallery = dbGalleryData.get({ plain: true });
      res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET one painting
// TODO: Replace the logic below with the custom middleware
router.get('/painting/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the painting
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
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
