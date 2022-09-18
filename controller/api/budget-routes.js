

const router = require('express').Router();
const { Budget } = require('../../models');

router.get('/', (req, res) => {
    Budget.findAll()
    .then(dbBudgetData => res.json (dbBudgetData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;