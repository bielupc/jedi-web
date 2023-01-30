const popErrorFormAlert = (element, wrapper) => {
    if(element) return;
    const alert = document.createElement('section');
    alert.id = "form-alert";
    alert.className = "alert alert-danger text-center col-xs-8 col-md-6 col-lg-4";
    alert.innerHTML = "¡Todos los campos son obligatórios!";
    wrapper.insertBefore( alert, wrapper.firstChild);
};

const cleanErrorFormAlert = (element, wrapper) => {
    if(!element) return;
    wrapper.removeChild(element);
};

const handleSubmitValidateFormData = e => {
    e.preventDefault();
    
    const element = document.getElementById('form-alert');
    const wrapper = document.getElementById('sections-wrapper');
    const form = document.forms["signinForm"];

    // const fields = Array.from(form);
    const fields = [...form.elements];

    fields.pop();
    if(fields.find( input => input.value.trim() === '' || input.value === null)) {
        return popErrorFormAlert(element, wrapper);
    }
    
    cleanErrorFormAlert(element, wrapper);
    
    const user = form["login-username"].value;
    alert(`Bienvenid@ ${user}`);
};

window.addEventListener("load", () => {
    document.getElementById("formulario").addEventListener("submit", handleSubmitValidateFormData);
});