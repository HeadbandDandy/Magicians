async function transactionFormHandler(event) {
    event.preventDefault();
  
    const transaction_text = document.querySelector('input[name="transaction-text"]').value;
    const transaction_amount = document.querySelector('input[name="transaction-amount"]').value;
    const budget_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      const response = await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify({
          budget_id,
          transaction_text,
          transaction_amount
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  
  
  document.querySelector('transactionForm').addEventListener('click', transactionFormHandler);
  
