const router = require('express').Router();
//const sequelize = require('../config/connection');
const { Budget, Transaction, User } = require('../models');


router.get('/', (req, res) => {
  console.log(req.session);
  Budget.findAll({
    attributes: [
      
      'user_id',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ],

    include: [
      {
        model: Transaction,
        attributes: ['id', 'transaction_text', 'transaction_amount', 'created_at'],
        
      }
    ]
  })
    .then(dbBudgetData => {
      // pass a single budget object into the homepage template
      const budgets = dbBudgetData.map(budget => budget.get({ plain: true }));
      console.log(dbBudgetData);
      res.render('dashboard', { 
        budgets,
      loggedIn: req.session.loggedIn
     });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/main', (req, res) => {
//   res.render('main');
// });


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// router.get('/login', (req, res) => {
//   res.render('welcome');
// });

module.exports = router;