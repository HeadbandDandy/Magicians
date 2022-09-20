//this file should contain the necessary items/modules in order to connect routes/router

const router = require('express').Router();

const budgetRoutes = require('../controller/api/budget-routes');
<<<<<<< HEAD

router.use('/budgets', budgetRoutes);
=======
const passportRoutes = require('../controller/api/passport-routes')

router.use('/budgets', budgetRoutes);
router.use('/passports', passportRoutes)
>>>>>>> 1b5d27f90cfd23ad8bd93b887b5bb19da3a66186

module.exports = router;