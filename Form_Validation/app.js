const form = document.querySelector("form");
const formNameField = document.getElementById("name");
const formEmailField = document.getElementById("email");
const formCityField = document.getElementById("city");
const formLanguageField = document.getElementById("language");
const alertDiv = document.querySelector(".alert");

const emailRegex =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const cities = ["chennai", "mumbai", "delhi", "kolkata", "bangalore", "other"];

function resetErrors() {
  form.name.classList = "form-control";
  form.email.classList = "form-control";
  form.city.classList = "form-control";
  form.language.classList = "form-control";
  for (let el of [
    "name-feedback",
    "city-feedback",
    "email-feedback",
    "language-feedback",
  ])
    document.getElementById(el).textContent = "";
}

function resetForm() {
  form.name.value = "";
  form.email.value = "";
  form.city.value = "";
  form.language.value = "";
  form.hasJob.value = "";
  form.termsAndConditions.checked = false;
}

function handleFormSubit(event) {
  event.preventDefault();
  let isCorrect = true;
  resetErrors();

  if (form.name.value.length < 3) {
    form.name.classList = "form-control is-invalid";
    document.getElementById("name-feedback").textContent =
      "Name should atleast be 3 character";
    isCorrect = false;
  }

  if (emailRegex.test(form.email.value) == false) {
    form.email.classList = "form-control is-invalid";
    document.getElementById("email-feedback").textContent =
      "Please Enter a valid Email";
    isCorrect = false;
  }

  if (cities.includes(form.city.value.toLowerCase()) === false) {
    form.city.classList = "form-control is-invalid";
    document.getElementById("city-feedback").textContent =
      "Select a valid City from list";
    isCorrect = false;
  }

  if (form.language.value.toLowerCase() === "click to see the options") {
    form.language.classList = "form-control is-invalid";
    document.getElementById("language-feedback").textContent =
      "Select your main programming Language";
    isCorrect = false;
  }

  if (isCorrect) {
    const data = {
      name: form.name.value,
      email: form.email.value,
      city: form.city.value,
      programmingLanguage: form.language.value,
      hasJob: form.hasJob.value,
    };
    resetForm();
    alertDiv.classList.replace("d-none", "d-block");
    setTimeout(() => {
      alertDiv.classList.replace("d-block", "d-none");
    }, 3000);
    console.log(data);
  }
}

function nameOnFocusOut(event) {
  if (event.target.value.length === 0)
    event.target.classList = "form-control is-invalid";
}

function emailOnFocusOut(event) {
  if (emailRegex.test(event.target.value) == false)
    event.target.classList = "form-control is-invalid";
}

function cityOnFocusOut(event) {
  if (!cities.includes(event.target.value.toLowerCase()))
    event.target.classList = "form-control is-invalid";
  else event.target.classList = "form-control";
}

function languageOnChange(event) {
  if (event.target.value.toLowerCase() === "click to see the options")
    event.target.classList = "form-control is-invalid";
  else event.target.classList = "form-control";
}

function anyFieldOnChange(event) {
  event.target.classList.remove("is-invalid");
}

// Eventlistners
form.addEventListener("submit", handleFormSubit);
formNameField.addEventListener("focusout", nameOnFocusOut);
formEmailField.addEventListener("focusout", emailOnFocusOut);
formCityField.addEventListener("focusout", cityOnFocusOut);
formLanguageField.addEventListener("focusout", languageOnChange);

formNameField.addEventListener("keyup", anyFieldOnChange);
formEmailField.addEventListener("keyup", anyFieldOnChange);
formCityField.addEventListener("keyup", anyFieldOnChange);
formLanguageField.addEventListener("change", languageOnChange);
