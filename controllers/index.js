//this file should contain the necessary items/modules in order to connect routes/router

const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

