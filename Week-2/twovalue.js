function calculate(operation) {

    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let result;

    if (operation === "+") {
        result = num1 + num2;
    }
    else if (operation === "-") {
        result = num1 - num2;
    }
    else if (operation === "*") {
        result = num1 * num2;
    }
    else if (operation === "/") {
        if (num2 === 0) {
            result = "Cannot divide by zero";
        } else {
            result = num1 / num2;
        }
    }

    document.getElementById("result").innerHTML = "Result: " + result;
}