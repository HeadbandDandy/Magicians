const router = require('express').Router();
const { User, Budget, Transaction } = require('../../models/index');

router.get('/', (req, res) => {
    Budget.findAll( {
        attributes: 'id',
    })
    .then(dbBudgetData => res.json(dbBudgetData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
} )

module.exports = router