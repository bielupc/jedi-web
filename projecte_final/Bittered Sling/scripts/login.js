let mode = "login";

$(window).on("load", async () => {
  $("#change-to-register").on("click", changeToRegister);
  $("#login").on("click", login);
});

const changeToRegister = () => {
  mode = "register";
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
  mode = "login";
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
  console.log(username, password)
}

const register = () => {
  const username = $(".username").val()
  const password1 = $(".password-1").val()
  const password2 = $(".password-2").val()
  console.log(username, password1, password2)
}