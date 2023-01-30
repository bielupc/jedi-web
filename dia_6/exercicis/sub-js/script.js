window.onload = function (){
  document.getElementById("form").addEventListener("submit", handleSubmit);
}

function handleSubmit(e){
  e.preventDefault();
  const form = document.getElementById("form")
  console.log(form["Password"].value)

  if (!form["Email"].value || !form["Password"].value){
    console.log("empty")
    const warning = document.createElement("div")
    warning.innerHTML = "Tots els camps son obligatoris!"
    warning.setAttribute("class", "alert alert-danger")
    let alertWrapper = document.getElementById("alert-wrapper")
    alertWrapper.appendChild(warning)
  } 
}

