const api = "https://jedi-json-server-production.up.railway.app/users"
let users = [];

$(window).on("load", async () => {
  try{
    users = (await axios.get(api)).data;
  }
  catch (err){
    console.log(err);
  }

  $("#login-btn").on("click", async () => {
    const username = $("#username").val();
    const password = $("#password").val();
    if (users.find(user => user.username === username && user.password === password)){
      window.location.href = "pages/shop.html"
    } 
    else{
      showAlert()
    };
  });
});

const showAlert = () => {
  $("#alert-wrapper").replaceWith(`
  <div id="alert-wrapper">
    <div class="alert alert-danger" role="alert">
      <i class="fa-solid fa-triangle-exclamation"></i>
      Usuario o contraseña incorrecta!
    </div>
  </id>
  `)
};