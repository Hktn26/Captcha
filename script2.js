const guessButton = document.getElementById("guessButton");
const guessInput = document.getElementById("guessInput")
const message = document.getElementById("message")

let secretNumber = Math.floor(Math.random() * 100) + 1;

guessButton.addEventListener("click", () => {
  const guess = parseInt(guessInput.value)
  if (guess === secretNumber)
    message.innerText = "Tebrikler! Doğru tahmin!"
  else if (guess < secretNumber)
    message.innerText = "Üzgünüm, tahmininiz çok düşük."
  else if (guess > secretNumber)
    message.innerText = "Üzgünüm, tahmininiz çok yüksek."
  else
    message.innerText = "Geçersiz tahmin..."
}) 