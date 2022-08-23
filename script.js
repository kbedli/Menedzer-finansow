const textInput = document.querySelector(".transaction-describtion");
const amountInput = document.querySelector(".transaction-amount");
const categorySelect = document.querySelector("#category");
const addBtn = document.querySelector(".add-btn");
const errorInfo = document.querySelector(".error-info");
const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const availableMoneyText = document.querySelector(".available-money-text");
const incomeSummary = document.querySelector(".income-summary");
const expenseSummary = document.querySelector(".expense-summary");

const popup = document.querySelector(".popup");
const popupInfo = document.querySelector(".popup-info");
const popupInputText = document.querySelector(".popup-input-text");
const popupInputAmount = document.querySelector(".popup-input-amount");
const popupAddBtn = document.querySelector(".accept");
const popupCloseBtn = document.querySelector(".cancel");

let ID = 0;
let transactionToEdit;
let incomeArr = [0];
let expenseArr = [0];

const addTransaction = () => {
  if (textInput.value !== "" && amountInput.value !== "") {
    const newTransaction = document.createElement("div");
    newTransaction.classList.add("transaction");
    newTransaction.setAttribute("id", ID);

    newTransaction.innerHTML = `
        <p class="transaction-name">
        ${textInput.value}</p>
       
        <p class="transaction-amount">
        ${amountInput.value} PLN </p>
        <div class = "tools">
        <button class="edit" onclick="editTransaction(${ID})">Edytuj</button
            ><button class="delete" onclick="deleteTransaction(${ID})">
              <i class="fas fa-times"></i>
            </button>
        </div>
       
        
    `;

    if (categorySelect.value == "incomes") {
      incomeSection.appendChild(newTransaction);
      newTransaction.classList.add("income");
      incomeArr.push(parseFloat(amountInput.value));
      countIncome(incomeArr);
    } else {
      expensesSection.appendChild(newTransaction);
      newTransaction.classList.add("expense");
      expenseArr.push(parseFloat(amountInput.value));
      countExpense(expenseArr);
    }

    ID++;

    countMoney();

    textInput.value = "";
    amountInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Uzupełnij wszystkie pola";
  }
};

const countMoney = () => {
  availableMoney.textContent =
    parseFloat(incomeSummary.textContent) -
    parseFloat(expenseSummary.textContent);

  if (availableMoney.textContent > 0) {
    availableMoneyText.textContent = `Możesz jeszcze wydać ${availableMoney.textContent} PLN`;
  } else if (availableMoney.textContent == 0) {
    availableMoneyText.textContent = `Bilans wynosi ${availableMoney.textContent}`;
  } else {
    availableMoneyText.textContent = `Bilans jest ujemny. Jesteś na minusie ${availableMoney.textContent} PLN`;
  }
};

const countIncome = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  incomeSummary.textContent = `${newMoney}`;
};

const countExpense = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  expenseSummary.textContent = `${newMoney}`;
};

const deleteTransaction = (id) => {
  const transactionToDelete = document.getElementById(id);
  const transactionAmount = parseFloat(
    transactionToDelete.childNodes[3].innerText
  );

  if (transactionToDelete.classList.contains("income")) {
    incomeSection.removeChild(transactionToDelete);
    const indexOfTransactionIncome = incomeArr.indexOf(transactionAmount);
    incomeArr.splice(indexOfTransactionIncome, 1);
    countIncome(incomeArr);
  } else {
    expensesSection.removeChild(transactionToDelete);
    const indexOfTransactionExpense = expenseArr.indexOf(transactionAmount);
    expenseArr.splice(indexOfTransactionExpense, 1);
    countExpense(expenseArr);
  }

  countMoney();
  cancelPopup();
};

const editTransaction = (id) => {
  popup.style.display = "flex";
  transactionToEdit = document.getElementById(id);
  popupInputText.value = transactionToEdit.childNodes[1].innerText;
  popupInputAmount.value = parseFloat(
    transactionToEdit.childNodes[3].innerText
  );
  popupInfo.textContent = "";
};

const cancelPopup = () => {
  popup.style.display = "none";
};

const changeTransactionTextAndAmount = () => {
  if (popupInputText.value !== "" && popupInputAmount.value !== "") {
    const transactionAmount = parseFloat(
      transactionToEdit.childNodes[3].innerText
    );

    if (transactionToEdit.classList.contains("income")) {
      const indexOfTransactionIncome = incomeArr.indexOf(transactionAmount);
      incomeArr.splice(indexOfTransactionIncome, 1);
      transactionToEdit.childNodes[1].innerText = popupInputText.value;
      transactionToEdit.childNodes[3].innerText =
        popupInputAmount.value + " PLN";
      incomeArr.push(parseFloat(transactionToEdit.childNodes[3].innerText));
      countIncome(incomeArr);
    } else {
      const indexOfTransactionExpense = expenseArr.indexOf(transactionAmount);
      expenseArr.splice(indexOfTransactionExpense, 1);
      transactionToEdit.childNodes[1].innerText = popupInputText.value;
      transactionToEdit.childNodes[3].innerText = popupInputAmount.value;
      expenseArr.push(parseFloat(transactionToEdit.childNodes[3].innerText));
      countExpense(expenseArr);
    }

    countMoney();

    popup.style.display = "none";
  } else {
    popupInfo.textContent = "Musisz wypełnić wszystkie pola";
  }
};

addBtn.addEventListener("click", addTransaction);
popupCloseBtn.addEventListener("click", cancelPopup);
popupAddBtn.addEventListener("click", changeTransactionTextAndAmount);
