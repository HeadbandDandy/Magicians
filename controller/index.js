//this file should contain the necessary items/modules in order to connect routes/router

const router = require('express').Router();

const budgetRoutes = require('../controller/api/budget-routes');
const passportRoutes = require('../controller/api/passport-routes')

router.use('/budgets', budgetRoutes, passportRoutes);

module.exports = router;