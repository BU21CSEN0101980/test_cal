document.addEventListener("DOMContentLoaded", function () {
    const displayTop = document.querySelector(".top-display");
    const displayBottom = document.querySelector(".bottom-display");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let previousInput = "";
    let operator = null;
    let resultDisplayed = false;
    let currentResult = null;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;

            if (/[0-9.]/.test(buttonText)) {
                if (resultDisplayed) {
                    clear();
                }
                currentInput += buttonText;
                updateDisplay();
            } else if (/[+\-*/]/.test(buttonText)) {
                if (operator !== null) {
                    calculate();
                }
                operator = buttonText;
                previousInput = currentInput;
                currentInput = "";
                resultDisplayed = false;
                updateDisplay();
            } else if (buttonText === "=") {
                if (!resultDisplayed) {
                    calculate();
                    operator = null; // Reset the operator
                    previousInput = currentInput; // Set previous input for further operations
                    currentInput = currentResult.toString(); // Use the result as the current input
                    resultDisplayed = true;
                    updateDisplay();
                }
            } else if (buttonText === "C") {
                clear();
            } else if (buttonText === "⌫") {
                clearSingleDigit();
            }
        });
    });

    function updateDisplay() {
        let equation = previousInput + " " + (operator || "") + " " + currentInput;
        displayTop.textContent = resultDisplayed ? currentInput : equation || "0";
        displayBottom.textContent = currentInput;
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operator) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "*":
                result = prev * current;
                break;
            case "/":
                if (current === 0) {
                    clear();
                    alert("Division by zero is not allowed.");
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        currentResult = result;
        currentInput = result.toString();
        previousInput = "";
    }

    function clear() {
        currentInput = "";
        previousInput = "";
        operator = null;
        currentResult = null;
        displayTop.textContent = "0";
        displayBottom.textContent = "0";
        resultDisplayed = false;
    }

    function clearSingleDigit() {
        if (resultDisplayed) {
            clear();
        } else {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }
    }
});