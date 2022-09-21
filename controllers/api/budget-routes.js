const router = require('express').Router();
const { Budget, Transaction, User } = require('../../models/index');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  console.log('======================');
    Budget.findAll({
      attributes: [
        'id',
        'title',
        'budgetAmount',
        'user_id',
        'created_at'
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'username' ]
        }
      ]
    })
    .then(dbBudgetData => res.json (dbBudgetData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  Budget.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
        'title',
        'budgetAmount',
        'user_id',
        'created_at',
    ],
    include: [
      {
        model: Transaction,
        attributes: ['id', 'transaction_text', 'created_at'],
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
      if (!dbBudgetData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbBudgetData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Budget.create({
    title: req.body.title,
    budgetAmount: req.body.budgetAmount,  
    user_id: req.session.user_id
  })
    .then(dbBudgetData => res.json(dbBudgetData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  console.log('---------------------------------');
  console.log(req.session);
  console.log(req.body, req.params);
  Budget.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbBudgetData => {
      if (!dbBudgetData) {
        res.status(404).json({ message: 'No Budget found with this id' });
        return;
      }
      res.json(dbBudgetData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Budget.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbBudgetData => {
      if (!dbBudgetData) {
        res.status(404).json({ message: 'No budget found with this id' });
        return;
      }
      res.json(dbBudgetData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  
module.exports = router;