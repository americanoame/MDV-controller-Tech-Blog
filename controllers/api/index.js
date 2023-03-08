const router = require('express').Router();
const userRoutes = require('./userRoutes');
const techRoutes = require('./techRoutes');

router.use('/users', userRoutes);
router.use('/tech', techRoutes);

module.exports = router;
