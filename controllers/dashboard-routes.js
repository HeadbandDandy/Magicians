const router = require('express').Router();
//const sequelize = require('../config/connection');
const { Budget, User, Transaction } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', (req, res) => {
//     res.render('dashboard', { loggedIn: true });
//   });

  router.get('/', withAuth, (req, res) => {
    console.log(req.session);
  console.log('======================');
    Budget.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'user_id',
        'budgetAmount',
        'title',
        // 'transaction_text',
        'created_at',
        //'username'
    ],
      include: [
        {
          model: Transaction,
          attributes: ['id', 'transaction_text', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbBudgetData => {
        // serialize data before passing to template
        const budgets = dbBudgetData.map(budget => budget.get({ plain: true }));
        console.log(budgets);
        res.render('dashboard', { budgets, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    Budget.findByPk(req.params.id, {
      attributes: [
        'id',
        'user_id',
        // 'transaction_text',
        'created_at'],
      include: [
        {
          model: Transaction,
          attributes: ['id', 'transaction_text', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbBudgetData => {
        console.log(dbBudgetData);
        if (dbBudgetData) {
          const budget = dbBudgetData.get({ plain: true });
          
          res.render('edit-budget', {
            budget,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;