document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();
  var formData = validateForm();

  if (formData) {
    displayFormData(formData);
  }
});

function validateForm() {
  var firstName = document.getElementById("firstName").value.trim();
  var middleName = document.getElementById("middleName").value.trim();
  var lastName = document.getElementById("lastName").value.trim();
  var email = document.getElementById("email").value.trim();
  var contactNumber = document.getElementById("contactNumber").value.trim();
  var password = document.getElementById("password").value.trim();
  var confirmPassword = document.getElementById("confirmPassword").value.trim();
  var streetUnit = document.getElementById("streetUnit").value.trim();
  var barangay = document.getElementById("barangay").value.trim();
  var city = document.getElementById("city").value.trim();
  var province = document.getElementById("province").value.trim();
  var zipCode = document.getElementById("zipCode").value.trim();

  var errorFields = [];

  if (firstName === "") {
    errorFields.push("firstName");
    document.getElementById("firstNameError").textContent =
      "Please enter your first name.";
  }

  if (lastName === "") {
    errorFields.push("lastName");
    document.getElementById("lastNameError").textContent =
      "Please enter your last name.";
  }

  if (!isValidEmail(email)) {
    errorFields.push("email");
    document.getElementById("emailError").textContent =
      "Please enter a valid email address.";
  }

  if (!isValidContactNumber(contactNumber)) {
    errorFields.push("contactNumber");
    document.getElementById("contactNumberError").textContent =
      "Please enter a valid contact number (numeric, maximum of 10 digits).";
  }

  if (!isValidPassword(password)) {
    errorFields.push("password");
    document.getElementById("passwordError").textContent =
      "Please enter a valid password (alphanumeric with upper and lowercase letters, and special characters).";
  }

  if (confirmPassword !== password) {
    errorFields.push("confirmPassword");
    document.getElementById("confirmPasswordError").textContent =
      "Passwords do not match.";
  }

  if (streetUnit === "") {
    errorFields.push("streetUnit");
    document.getElementById("streetUnitError").textContent =
      "Please enter your street/unit.";
  }

  if (barangay === "") {
    errorFields.push("barangay");
    document.getElementById("barangayError").textContent =
      "Please enter your barangay.";
  }

  if (city === "") {
    errorFields.push("city");
    document.getElementById("cityError").textContent =
      "Please enter your city.";
  }

  if (province === "") {
    errorFields.push("province");
    document.getElementById("provinceError").textContent =
      "Please enter your province.";
  }

  if (!isValidZipCode(zipCode)) {
    errorFields.push("zipCode");
    document.getElementById("zipCodeError").textContent =
      "Please enter a valid zip code (numeric).";
  }

  applyErrorStyles(errorFields);

  if (errorFields.length === 0) {
    return [
      firstName,
      middleName,
      lastName,
      email,
      contactNumber,
      password,
      streetUnit,
      barangay,
      city,
      province,
      zipCode,
    ];
  }

  return null;
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidContactNumber(contactNumber) {
  var contactNumberRegex = /^\d{1,10}$/;
  return contactNumberRegex.test(contactNumber);
}

function isValidPassword(password) {
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
  return passwordRegex.test(password);
}

function isValidZipCode(zipCode) {
  var zipCodeRegex = /^\d+$/;
  return zipCodeRegex.test(zipCode);
}

function applyErrorStyles(fields) {
  fields.forEach(function (field) {
    document.getElementById(field).classList.add("error");
  });
}

function clearErrors() {
  var errorFields = document.querySelectorAll(".error");
  errorFields.forEach(function (field) {
    field.classList.remove("error");
  });

  var errorMessages = document.querySelectorAll(".text-danger");
  errorMessages.forEach(function (message) {
    message.textContent = "";
  });
}

function displayFormData(formData) {
  var formContainer = document.querySelector(".container");
  var outputDiv = document.createElement("div");
  outputDiv.innerHTML =
    "<h2>Form Data:</h2><pre>" + formData.join("\n") + "</pre>";
  formContainer.appendChild(outputDiv);
}
