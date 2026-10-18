const form = document.getElementById("numberForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstNumber = Number(
        document.getElementById("firstNumber").value
    );

    const secondNumber = Number(
        document.getElementById("secondNumber").value
    );

    const sum = firstNumber + secondNumber;

    document.getElementById("result").textContent =
        "The sum is: " + sum;
});