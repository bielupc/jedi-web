api = "https://bittered-sling-json-server-production.up.railway.app/"
let users = [];

$(window).on("load", async () => {
  // Alertes i validacions
  if (JSON.parse(localStorage.getItem("justRegistered"))){
    showSuccess("The user has been successfully registered!");
    localStorage.setItem("justRegistered", false)
  }
  if (JSON.parse(localStorage.getItem("logged")) === false){
    showWarning("You need to log in or create a new user!")
    localStorage.removeItem("logged")
  }
  if (JSON.parse(localStorage.getItem("logged")) === 1){
    showWarning("You have been logged out")
    localStorage.removeItem("logged")
  }

  try{
    users = (await axios.get(api+"users")).data;
  }
  catch(error){
    showWarning("Couldn't connect to server...")
    console.log(error);
  }
  
  $("#change-to-register").on("click", changeToRegister);
  $("#login").on("click", login);

  // Enter també activa el botó
  $(document).keypress(function(event) {
    if (event.which === 13) {
        $(".btn").click();
    }
  });
});

// Canviar a formulari de registre
const changeToRegister = () => {
  $(".alert-wrapper").empty();
  $(".login-card").replaceWith(`
    <div class="login-card">
      <h1><b>Register</b></h1>
      <h3>Enter your data</h3>
      <form class="login-form">
        <input class="username" required type="text" placeholder="Username"/>
        <input class="password-1" required type="password" placeholder="Password"/>
        <input class="password-2" required type="password" placeholder="Repeat password"/>
        <a id="change-to-login">I'm already registered.</a>
        <button type="button" id="register" class="btn btn-primary btn-lg">Register</button>
      </form>
    </div>
  `);
  $("#change-to-login").on("click", changeToLogin);
  $("#register").on("click", register);
};

// Canviar a formulari de login
const changeToLogin = () => {
  $(".alert-wrapper").empty();
  $(".login-card").replaceWith(`
    <div class="login-card">
      <h1><b>Login</b></h1>
      <h3>Enter your credentials</h3>
      <form class="login-form">
        <input class="username" required type="text" placeholder="Username"/>
        <input class="password" required type="password" placeholder="Password"/>
        <a id="change-to-register">Are you new here?</a>
        <button type="button" id="login" class="btn btn-primary btn-lg">Login</button>
      </form>
    </div>
  `);
  $("#change-to-register").on("click", changeToRegister);
  $("#login").on("click", login);
};


// Procés de login
const login = () => {
  const username = $(".username").val();
  const password = $(".password").val();
  const user = users.find(user => user.username === username && user.password === password);
  if (username && password){
    if (user){
      localStorage.setItem("logged", true);
      window.location.href = "pages/home.html";
    }
    else{
      showWarning("The password or the username is incorrect!");
    }
  }
  else{
    showWarning("You must fill all the fields!");
  }
};

// Procés de registre
const register = async () => {
  const username = $(".username").val();
  const password1 = $(".password-1").val();
  const password2 = $(".password-2").val();
  const registered = users.find(user => user.username === username);
  if(!registered){
    if (username && password1 && password2){
      if (password1 === password2){
        const user = {
            id: createUUID(),
            username,
            password: password1,
        };
        await axios.post(api+"users", user)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err); 
          showWarning("There has been an error!");
        })
        localStorage.setItem("justRegistered", true);
        location.reload()
      }
      else{
        showWarning("The passwords you have entered do not match!");
      }
    }
    else{
      showWarning("There are some empty fields!");
    }
   }
   else{
    showWarning("This user is already registered!");
  }
};

// Utils
const showWarning = (msg) => {
  $(".alert-wrapper").replaceWith($(`
    <div class="alert-wrapper row justify-content-center">
      <div class="align-self-end alert alert-danger position-absolute d-flex align-items-center justify-content-center" role="alert">
        <div>
          <i class="fa-solid fa-triangle-exclamation"></i> 
          ${msg}
        </div>
      </div>
    </div>
  `).hide().fadeIn("3000"));
};

const showSuccess = (msg) => {
  $(".alert-wrapper").replaceWith($(`
    <div class="alert-wrapper row justify-content-center">
      <div class="align-self-end alert alert-success position-absolute d-flex align-items-center justify-content-center" role="alert">
        <div>
          <i class="fa-solid fa-check"></i>
          ${msg}
        </div>
      </div>
    </div>
  `).hide().fadeIn("3000"));
};

function createUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
        const r = (dt + Math.random()*16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (char === 'x' ? r :(r&0x3|0x8)).toString(16);
    });

    return uuid;
};