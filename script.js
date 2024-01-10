// Selecting necessary DOM elements
const captchaTextBox = document.querySelector(".captch_box input");
const refreshButton = document.querySelector(".refresh_button");
const audioButton = document.querySelector(".audioButton");
const captchaInputBox = document.querySelector(".captch_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");
let button = document.querySelector(".button button");
let inputField = document.querySelector(".captch_input input");
let usernameInput = document.querySelector(".username_input input");
let passwordInput = document.querySelector(".password_input input");
let emailInput = document.querySelector(".email_input input");

// Variable to store generated captcha
let captchaText = null;
// const captchaText = "Secure Captcha Text";

// Function to speak captcha text
const speakCaptchaText = () => {
  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance(captchaText.split(" ").join(" "));
    const voices = window.speechSynthesis.getVoices();
    const turkishVoice = voices.find((voice) => voice.lang.includes("tr-TR"));
    if (turkishVoice) {
      msg.voice = turkishVoice;
      msg.rate = 0.4;
      window.speechSynthesis.speak(msg);
    } else {
      console.log("Turkish voice not found.");
    }
  } else {
    console.log("Your browser does not support text-to-speech.");
  }
};


const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 9);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char
  );
  captchaText = changeString.join("  ");
  captchaText = "         " + captchaText + "       ";
  captchaTextBox.value = captchaText;
  captchaTextBox.classList.add("captcha-text");
  console.log(captchaText);
};

function verifyInput() {
  if (inputField.value.toLowerCase() === captcha.text.toLowerCase()) {
    button.disabled = false;
    button.classList.remove("disabled");
  } else {
    button.disabled = true;
    button.classList.add("disabled");
  }
  if (button.disabled) {
    speakCaptchaText();
  }
}

button.addEventListener("click", function () {
  captcha.refresh();
  inputField.value = "";
  button.disabled = true;
  button.classList.add("disabled");
});

const refreshBtnClick = () => {
  generateCaptcha();
  captchaInputBox.value = "";
  captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
  //Toggle submit button disable class based on captcha input field.
  submitButton.classList.toggle("disabled", !captchaInputBox.value);

  if (!captchaInputBox.value) message.classList.remove("active");
};

// Function to validate the entered captcha
const submitBtnClick = () => {
  captchaText = captchaText
    .split("")
    .filter((char) => char !== " ")
    .join("");
  message.classList.add("active");
  // Check if the entered captcha text is correct or not
  if (captchaInputBox.value === captchaText) {
    message.innerText = "Girilen captcha doğrudur.";
    message.style.color = "#0A9900";
    message.style.fontWeight = "bold";

    setTimeout(() => {
      window.location.href = "index2.html";
    }, 1000);
  } else {
    message.innerText = "Girilen captcha doğru değildir!";
    message.style.color = "#FF2525";
    message.style.fontWeight = "bold";
  }
};

// Add event listeners for the refresh button, captchaInputBox, submit button
refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);
audioButton.addEventListener("click", speakCaptchaText);

inputField.addEventListener("input", verifyInput);
usernameInput.addEventListener("input", verifyInput);
passwordInput.addEventListener("input", verifyInput);
emailInput.addEventListener("input", verifyInput);

// Generate a captcha when the page loads
generateCaptcha();
