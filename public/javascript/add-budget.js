async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="budget-title"]').value;
    const budgetAmount = document.querySelector('input[name="budget-amount"]').value;
  
    const response = await fetch(`/api/budgets`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        budgetAmount
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


  
  document.querySelector('.new-budget-form').addEventListener('submit', newFormHandler);
  