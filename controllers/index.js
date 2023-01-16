const apiRoutes = require('./api');
const router = require("express").Router();
const homeRouter = require("./homeRouters");
router.use('/', homeRouter);
router.use('/api', apiRoutes);

module.exports = router;
