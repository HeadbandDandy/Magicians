const router = require('express').Router();
const {  Transaction, Budget } = require('../../models/index');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
    Transaction.findAll({
        attributes: [
            'id',
            'transaction_text',
            'transaction_amount',
            'budget_id',
            'created_at'
          ],
          include: [
            {
              model: Budget,
              attributes: ['id' ]
            }
          ]
        })
      .then(dbTransactionData => res.json(dbTransactionData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });
 
    router.get('/:id', (req, res) => {
        Transaction.findOne({
          where: {
            id: req.params.id
          },
          attributes: [
            'id',
            'transaction_text',
            'transaction_amount',
            'budget_id',
            'created_at'
          ],
          include: [
            {
              model: Budget,
              attributes: ['id' ]
            }
          ]
        })
          .then(dbTransactionData => {
            if (!dbTransactionData) {
              res.status(404).json({ message: 'No Transaction found with this id' });
              return;
            }
            res.json(dbTransactionData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });

  router.post('/', withAuth, (req, res) => {
    Transaction.create({
      transaction_text: req.body.transaction_text,
      transaction_amount: req.body.transaction_amount,
      budget_id: req.session.budget_id
      
    })
      .then(dbTransactionData => res.json(dbTransactionData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.delete('/:id', withAuth, (req, res) => {
    Transaction.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbTransactionData => {
        if (!dbTransactionData) {
          res.status(404).json({ message: 'No Transaction found with this id!' });
          return;
        }
        res.json(dbTransactionData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  
module.exports = router;