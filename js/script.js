let passwordHistory = [];

function copyPassword() {
    var copyText = document.getElementById("generatedPasswordBox");
    copyText.select();
    copyText.setSelectionRange(0, 101);
    navigator.clipboard.writeText(copyText.value);
    showNotification();
}

function showNotification() {
    var notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(function() {
      notification.style.display = 'none';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightYearElement = document.getElementById('copyright-year');
    copyrightYearElement.textContent = currentYear;
    
    const rangeInput = document.getElementById('rangeInput');
    const rangeValue = document.getElementById('rangeValue');

    updateRangeValue();

    rangeInput.addEventListener('input', updateRangeValue);

    function updateRangeValue() {
        rangeValue.innerHTML = rangeInput.value;
        
        const thumbWidth = 13;
        const percent = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min);
        const position = percent * (rangeInput.offsetWidth - thumbWidth);
        rangeValue.style.left = `${position}px`;
    }
    
    function generatePassword(length, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols) {
        let charset = '';
        let password = '';
        
        if (includeUpperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowerCase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()-_=+';

        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        return password;
    }

    function updateGeneratedPassword() {
        const length = document.getElementById('rangeInput').value;
        const includeUpperCase = document.getElementById('upprCase').checked;
        const includeLowerCase = document.getElementById('lowerCase').checked;
        const includeNumbers = document.getElementById('numbers').checked;
        const includeSymbols = document.getElementById('symbols').checked;

        const generatedPassword = generatePassword(length, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols);
        
        document.getElementById('generatedPasswordBox').value = generatedPassword;

        addToPasswordHistory(generatedPassword);
    }

    function addToPasswordHistory(password) {
        passwordHistory.unshift(password);
        if (passwordHistory.length > 10) {
            passwordHistory.pop();
        }
        updatePasswordHistoryDisplay();
    }

    function updatePasswordHistoryDisplay() {
        const passwordHistoryContainer = document.getElementById('passwordHistory');
        passwordHistoryContainer.innerHTML = '';

        passwordHistory.forEach((password) => {
            const passwordElement = document.createElement('div');
            passwordElement.textContent = password;
            passwordHistoryContainer.appendChild(passwordElement);
        });
    }

    document.getElementById('refreshButton').addEventListener('click', updateGeneratedPassword);

    document.getElementById('rangeInput').addEventListener('input', function() {
        document.getElementById('rangeValue').textContent = this.value;
        updateGeneratedPassword();
    });
    updateGeneratedPassword();
});
