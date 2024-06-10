// backend/routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add a new transaction
router.post('/', async (req, res) => {
    const newTransaction = new Transaction({
        description: req.body.description,
        amount: req.body.amount
    });

    try {
        const savedTransaction = await newTransaction.save();
        res.json(savedTransaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        res.json(deletedTransaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
