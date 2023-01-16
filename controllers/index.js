const apiRoutes = require('./api');
const router = require("express").Router();
const homeRouter = require("./homeRoutes");
router.use('/', homeRouter);
router.use('/api', apiRoutes);

module.exports = router;
