async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="budget-title"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const budgetAmount = document.querySelector('input[name="budget-amount"]').value.trim();

    const response = await fetch(`/api/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        budgetAmount
        
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-budget-form').addEventListener('submit', editFormHandler);
  