const accessible_form = document.getElementById("accessible-form")

const fullName = document.getElementById("full-name")
const email = document.getElementById("email")

const eyeicon_password = document.getElementById("eyeicon-password")
const eyeicon_confirm_password = document.getElementById("eyeicon-confirm-password")

let password = document.getElementById("password")
let confirm_password = document.getElementById("confirm-password") 

// Error messages
const pwdErrorMessage = document.getElementById("confirm-password-error-message")
const nameErrorMessage = document.getElementById("name-error-message")
const emailErrorMessage = document.getElementById("email-error-message")

function nameSuccess(name) {
    return name.value.trim() !== ""
}

function passwordsEqual(first_password, confirmed_password) {
    return first_password.value.trim() !== "" && confirmed_password.value.trim() !== "" && first_password.value === confirmed_password.value
}

function addNotShow (element) {
    element.classList.add("not-show")
}

function removeNotShow (element) {
    element.classList.remove("not-show")
}

function setFieldValidation(input, errorElement, isValid) {
    if (isValid) {
        input.setAttribute("aria-invalid", "false");
        addNotShow(errorElement);
    } else {
        input.setAttribute("aria-invalid", "true");
        removeNotShow(errorElement);
    }
}

function togglePasswordVisibility (input, button) {
    const isHidden = input.type === "password" 
    input.type = isHidden ? "text" : "password"

    button.setAttribute(
        "aria-label", 
        isHidden ? "Hide password. Password is visible." : "Show Password. Password is hidden."
    )

    button.setAttribute(
        "aria-hidden",
        isHidden ? 'true' : 'false'
    )

    button.setAttribute("aria-pressed", isHidden ? "true" : "false");
}

eyeicon_password.addEventListener("click", () => {
    togglePasswordVisibility(password, eyeicon_password);
});

eyeicon_confirm_password.addEventListener("click", () => {
    togglePasswordVisibility(confirm_password, eyeicon_confirm_password);
});

accessible_form.onsubmit = function (event) {
    event.preventDefault();

    const isNameValid = nameSuccess(fullName)
    setFieldValidation(fullName, nameErrorMessage, isNameValid)

    const isPasswordValid = passwordsEqual(password, confirm_password)
    setFieldValidation(confirm_password, pwdErrorMessage, isPasswordValid)

    const isEmailValid = email.validity.valid; 
    setFieldValidation(email, emailErrorMessage, isEmailValid)
}