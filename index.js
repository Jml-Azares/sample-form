document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();
  let formData = validateForm();
  if (formData) {
    document.getElementById("myForm").style.display = "none";
    displayFormData(formData);
  }
});

function validateForm() {
  let firstName = document.getElementById("firstName").value.trim();
  let middleName = document.getElementById("middleName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let email = document.getElementById("email").value.trim();
  let contactNumber = document.getElementById("contactNumber").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  let streetUnit = document.getElementById("streetUnit").value.trim();
  let barangay = document.getElementById("barangay").value.trim();
  let city = document.getElementById("city").value.trim();
  let province = document.getElementById("province").value.trim();
  let zipCode = document.getElementById("zipCode").value.trim();

  let errorFields = [];

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
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidContactNumber(contactNumber) {
  let contactNumberRegex = /^\d{1,10}$/;
  return contactNumberRegex.test(contactNumber);
}

function isValidPassword(password) {
  let passwordRegex =
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
  let errorFields = document.querySelectorAll(".error");
  errorFields.forEach(function (field) {
    field.classList.remove("error");
  });

  let errorMessages = document.querySelectorAll(".text-danger");
  errorMessages.forEach(function (message) {
    message.textContent = "";
  });
}

function displayFormData(formData) {
  let formDataContainer = document.getElementById("formDataContainer");
  formDataContainer.style.display = "block";
  let outputHtml = "<h2>Form Data:</h2>";
  let fieldLabels = {
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    email: "Email",
    contactNumber: "Contact Number",
    password: "Password",
    streetUnit: "Street/Unit",
    barangay: "Barangay",
    city: "City/Town",
    province: "Province",
    zipCode: "Zip Code",
  };
  for (let i = 0; i < formData.length; i++) {
    let label = fieldLabels[Object.keys(fieldLabels)[i]];
    let value = formData[i];
    outputHtml += "<p><strong>" + label + ": </strong>" + value + "</p>";
  }

  formDataContainer.innerHTML = outputHtml;
}
