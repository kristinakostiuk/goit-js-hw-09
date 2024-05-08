const formRefs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input[type="email"]'),
    message: document.querySelector('textarea[name="message"]')
};

let formData = {
    email: "",
    message: ""
};

populateFormFields();

formRefs.form.addEventListener("submit", onFormSubmit);
formRefs.form.addEventListener("input", onInputChange);

function onFormSubmit(event) {
    event.preventDefault();

    if (!formData.email.trim() || !formData.message.trim()) {
        alert('Fill please all fields');
        return;
    }

    console.log(formData);
    clearLocalStorageAndForm();
}

function onInputChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value.trim();
    formData[fieldName] = fieldValue;
    saveFormDataToLocalStorage();
}

function populateFormFields() {
    const savedFormData = loadFormDataFromLocalStorage();

    if (savedFormData) {
        Object.keys(savedFormData).forEach(fieldName => {
            formRefs[fieldName].value = savedFormData[fieldName];
            formData[fieldName] = savedFormData[fieldName];
        });
    }
}

function clearLocalStorageAndForm() {
    localStorage.removeItem("feedback-form-state");
    formData = { email: '', message: '' };
    formRefs.form.reset();
}

function saveFormDataToLocalStorage() {
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}

function loadFormDataFromLocalStorage() {
    const savedData = localStorage.getItem("feedback-form-state");
    return savedData ? JSON.parse(savedData) : null;
}
