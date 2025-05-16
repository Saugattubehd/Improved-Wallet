  const menuBtn = document.querySelector('#menu-btn');
            const sidebar = document.querySelector('.sidebar');

            menuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('show');
            });

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!sidebar.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
                        sidebar.classList.remove('show');
                    }
                }
            });
document.addEventListener("DOMContentLoaded", function () {
    const themeBtn = document.querySelector('.darkmd-btn');
    const body = document.body;
    const lightIcon = themeBtn.querySelector("span:nth-child(1)");
    const darkIcon = themeBtn.querySelector("span:nth-child(2)");

    // Load and apply the saved theme
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        lightIcon.classList.remove('active'); 
        darkIcon.classList.add('active'); 
    } else {
        body.classList.remove('dark-theme');
        lightIcon.classList.add('active'); 
        darkIcon.classList.remove('active'); 
    }

    // Toggle dark mode and save it in localStorage
    themeBtn.addEventListener('click', function () {
        body.classList.toggle('dark-theme');

        // Toggle icons
        lightIcon.classList.toggle('active');
        darkIcon.classList.toggle('active');

        // Save theme to localStorage
        const newTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });
});
// Initialize balance variables
let isHidden = true;
let actualBalance = 3000.00;

function updateBalanceInRealTime() {
    const change = (Math.random() * 25 - 10).toFixed(2);
    actualBalance = parseFloat((actualBalance + parseFloat(change)).toFixed(2));

    if (!isHidden) {
        document.getElementById('balance').textContent = actualBalance.toFixed(2);
    }

    updateTransactionHistory(change);

    const nextUpdateTime = Math.floor(Math.random() * 8000) + 2000;
    setTimeout(updateBalanceInRealTime, nextUpdateTime);
}

function updateTransactionHistory(amount) {
    const transactionList = document.getElementById('transaction-history');
    if (!transactionList) return;

    const transactionType = parseFloat(amount) >= 0 ? 'credit' : 'debit';
    const transactionAmount = Math.abs(parseFloat(amount)).toFixed(2);
    const currentDate = new Date();

    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const dayMonth = currentDate.toLocaleDateString('en-US', dateOptions);
    const time = currentDate.toLocaleTimeString('en-US', timeOptions);

    const transactionItem = document.createElement('div');
    transactionItem.className = 'transaction-item';
    transactionItem.innerHTML = `
        <div class="transaction-date">
            <div class="day-month">${dayMonth}</div>
            <div class="time">${time}</div>
        </div>
        <div class="transaction-description">
            <div class="transaction-title">${transactionType === 'credit' ? 'Money Received' : 'Payment Sent'}</div>
            <div class="transaction-details">${transactionType === 'credit' ? 'Real-time Credit' : 'Real-time Debit'}</div>
        </div>
        <div class="transaction-amount ${transactionType}">
            ${transactionType === 'credit' ? '+ ' : '- '}NRP ${transactionAmount}
        </div>
        <div class="transaction-status ${transactionType === 'credit' ? 'completed' : 'pending'}">
            ${transactionType === 'credit' ? 'Completed' : 'Pending'}
        </div>
    `;

    transactionList.insertBefore(transactionItem, transactionList.firstChild);

    while (transactionList.children.length > 10) {
        transactionList.removeChild(transactionList.lastChild);
    }
}

function toggleBalance() {
    const balanceSpan = document.getElementById('balance');
    const eyeIcon = document.getElementById('eyeIcon');

    if (!balanceSpan || !eyeIcon) return;

    if (isHidden) {
        balanceSpan.textContent = actualBalance.toFixed(2);
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    } else {
        balanceSpan.textContent = 'XXXXX';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }

    isHidden = !isHidden;
}

function initializeBalanceDisplay() {
    const balanceSpan = document.getElementById('balance');
    const eyeIcon = document.getElementById('eyeIcon');

    if (!balanceSpan || !eyeIcon) return;

    if (isHidden) {
        balanceSpan.textContent = 'XXXXX';
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        balanceSpan.textContent = actualBalance.toFixed(2);
        eyeIcon.classList.add('fa-eye');
    }

    document.querySelector('.balance-toggle').addEventListener('click', toggleBalance);

    updateBalanceInRealTime();
}

document.addEventListener('DOMContentLoaded', initializeBalanceDisplay);

