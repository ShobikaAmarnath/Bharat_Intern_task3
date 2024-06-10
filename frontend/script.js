// frontend/script.js
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

const apiUrl = 'http://localhost:5000/transactions';

// Fetch transactions and render them
async function fetchTransactions() {
    const response = await fetch(apiUrl);
    const transactions = await response.json();

    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        addTransactionToDOM(transaction);
    });
}

// Add a new transaction
transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    const transaction = { description, amount };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    });

    const newTransaction = await response.json();
    addTransactionToDOM(newTransaction);

    transactionForm.reset();
});

// Add transaction to DOM
function addTransactionToDOM(transaction) {
    const li = document.createElement('li');
    li.classList.add(transaction.amount > 0 ? 'income' : 'expense');

    li.innerHTML = `
        ${transaction.description} <span>${transaction.amount}</span>
        <button class="delete-btn" onclick="deleteTransaction('${transaction._id}')">x</button>
    `;

    transactionList.appendChild(li);
}

// Delete transaction
async function deleteTransaction(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    fetchTransactions();
}

// Initial fetch
fetchTransactions();
