
const expenseForm = document.querySelector("#expenseForm");
const transactionList = document.querySelector("#transactionList");

const balanceElement = document.querySelector("#balance");
const incomeElement = document.querySelector("#income");
const expenseElement = document.querySelector("#expense");
const emptyMessage = document.querySelector("#emptyMessage");

const dateInput = document.querySelector("#date");

// Set today's date by default
dateInput.value = new Date().toISOString().split("T")[0];

// Restore saved transactions
let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];

// Save transactions
function saveTransactions() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

// Update summary cards
function updateSummary() {
    const income = transactions
        .filter(item => item.type === "income")
        .reduce((total, item) => total + item.amount, 0);

    const expense = transactions
        .filter(item => item.type === "expense")
        .reduce((total, item) => total + item.amount, 0);

    const balance = income - expense;

    balanceElement.textContent = `₹${balance.toFixed(2)}`;
    incomeElement.textContent = `₹${income.toFixed(2)}`;
    expenseElement.textContent = `₹${expense.toFixed(2)}`;
}

// Display transactions
function displayTransactions() {
    transactionList.innerHTML = "";

    emptyMessage.style.display =
        transactions.length === 0 ? "block" : "none";

    transactions.forEach(item => {
        const li = document.createElement("li");

        const info = document.createElement("div");
        info.className = "transaction-info";

        const name = document.createElement("strong");
        name.textContent = item.title;

        const details = document.createElement("small");
        details.textContent =
            `${item.category} | ${item.date}`;

        info.appendChild(name);
        info.appendChild(details);

        const right = document.createElement("div");
        right.className = "transaction-right";

        const amount = document.createElement("strong");
        amount.textContent =
            `${item.type === "income" ? "+" : "-"}₹${item.amount.toFixed(2)}`;

        amount.style.color =
            item.type === "income" ? "#16a34a" : "#dc2626";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.dataset.id = item.id;

        right.appendChild(amount);
        right.appendChild(deleteButton);

        li.appendChild(info);
        li.appendChild(right);

        transactionList.appendChild(li);
    });

    updateSummary();
}

// Add transaction
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const amount = Number(document.querySelector("#amount").value);
    const type = document.querySelector("#type").value;
    const category = document.querySelector("#category").value;
    const date = dateInput.value;

    if (!title || !Number.isFinite(amount) || amount <= 0 || !date) {
        alert("Please enter valid transaction details.");
        return;
    }

    const transaction = {
        id: Date.now().toString(),
        title,
        amount,
        type,
        category,
        date
    };

    transactions.push(transaction);

    saveTransactions();
    displayTransactions();

    expenseForm.reset();
    dateInput.value = new Date().toISOString().split("T")[0];
});

// Event delegation for deleting transactions
transactionList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.dataset.id;

        transactions = transactions.filter(
            item => item.id !== id
        );

        saveTransactions();
        displayTransactions();
    }
});

// Initial page display
displayTransactions();
