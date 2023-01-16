const router = require('express').Router();
const { Tech } = require('../../models');

router.post('/', withAuth, async (req, res) => {
  try {
    const newmdv = await Tech.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newmdv);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/comment', withAuth, async (req, res) => {
  try {
    const newmdv = await Tech.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newmdv);
  } catch (err) {
    res.status(400).json(err);
  }
});

// tittle content where

router.put('/', withAuth, async (req, res) => {
  try {
    const newmdv = await Tech.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newmdv);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const TechData = await Tech.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
