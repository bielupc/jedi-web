api = "https://bittered-sling-json-server-production.up.railway.app/"
let users = [];

$(window).on("load", async () => {
  try{
    users = (await axios.get(api+"users")).data;
  }
  catch(error){
    console.log(error);
  }
  $("#change-to-register").on("click", changeToRegister);
  $("#login").on("click", login);
});

const changeToRegister = () => {
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

const changeToLogin = () => {
  heightMod = false;
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

const login = () => {
  const username = $(".username").val()
  const password = $(".password").val()
  const user = users.find(user => user.username === username && user.password === password);
  if (username && password){
    if (user){
      alert("success")
    }
    else{
      alert("wrong passwd")
    }
  }
  else{
    alert("empty fields")
  }
};

const register = async () => {
  const username = $(".username").val()
  const password1 = $(".password-1").val()
  const password2 = $(".password-2").val()
  const registered = users.find(user => user.username === username);
  if(!registered){
    if (username && password1 && password2){
      if (password1 === password2){
        console.log("valid")
        const user = {
            id: createUUID(),
            username,
            password: password1
        }
        await axios.post(api+"users", user)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err); 
        })
        location.reload()
        alert("success")
      }
      else{
        alert("passwords don't match")
      }
    }
    else{
      alert("empty fields")
    }
   }
   else{
    alert("already registered")
  }
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