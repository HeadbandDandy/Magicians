

// const balance = document.getElementById('balance');
// const amount = document.getElementById('amount');


// function updateValues() {
//     const amounts = transactions.map(transaction => transaction.amount);
  
//     const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
//     balance.innerText = `$${total}`;
// //     money_plus.innerText = `$${income}`;
// //     money_minus.innerText = `$${expense}`;
//  }

// function init() {
//  updateValues();

// };

// init();

// form.addEventListener('submit', addTransaction);

async function balanceFormHandler(event) {
    event.preventDefault();
    console.log('!!!!!!!!!!!!!!!!!');

    const amount = document.querySelector('input[name="amount"]').value;

    const response = await fetch('/api/budgets', {
        method: 'POST',
        body: JSON.stringify({
            amount
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('!!!!!!!!!!!!!!!!!');
        console.log(response);
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

  document.querySelector('transaction-form').addEventListener('submit', balanceFormHandler);
  