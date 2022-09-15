const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const assetAmount = document.getElementById('asset-amount');
const assetText = document.getElementById('asset-text')
const assetForm = document.getElementById('asset-form')


const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);
  

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

const localStorageAssets = JSON.parse(
  localStorage.getItem('assets')
)

//function should generate and add new assets
let assets = 
  localStorage.getItem('assets') !== null ? localStorageAssets : [];

  //add asset
  function addAsset(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
      alert('Please add a text amount');
    } else {
      const asset = {
        id: generateAssetID(),
        assetText: assetText.value,
        assetAmount: +assetAmount.value
      };

      asset.push(asset);

      addAssetDOM(asset);

      updateValues();

      updateLocalStorage()

      assetText = '';
      assetAmount = '';
    }
  }







// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function generateAssetID() {
  return Math.floor(Math.random() * 10000000000)
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus' );

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// add asset to DOM list

function addAssetDOM(asset) {
  //get the sign
  const sign = asset.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //class added based on value 
  item.classList.add(asset.assetAmount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
  ${asset.assetText} <span>${sign}${Math.abs(
    asset.assetAmount
  )}</span> <button class="asset-delete" onclick="removeAsset(${
    asset.id
  })">x</button>
  `;

  list.appendChild(item)
};

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Update the balance, income and expense
function updateAssets() {
  const amounts = assets.map(asset => asset.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

//removes assets by id
function removeAsset(id) {
  assets = assets.filet(asset => asset.id !== id);

  updateLocalStorage()

  init()
}



// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}



// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();

  assets.forEach(addAssetDOM);
  updateValues()
}

init();

form.addEventListener('submit', addTransaction);
form.addEventListener('submit', addAsset);