
async function balanceFormHandler(event) {
    event.preventDefault();
    console.log('!!!!!!!!!!!!!!!!!');

    const amount = document.querySelector('input[name="transaction-amount"]').value;

    const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const response = await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify({
            amount
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('!!!!!!!!!!!!!!!?');
        console.log(total);
        balance.innerText = `$${total}`;
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

  //document.querySelector('.transaction-amount').addEventListener('click', balanceFormHandler);
  
  transactionForm.addEventListener('submit', balanceFormHandler);



































  

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
