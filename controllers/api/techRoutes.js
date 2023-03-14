const router = require('express').Router();
const { Tech } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newTech = await Tech.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTech);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/new', withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     console.log("newComment: ", newComment);
//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.put('/:id', withAuth, async (req, res) => {
  try {
    const techData = await Tech.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {

        where: {
          id: req.params.id
        },
      }
    )

    if (!techData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(techData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const techData = await Tech.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!techData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(techData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
