let mode = "login";

$(window).on("load", async () => {
  $("#change-to-register").on("click", changeToRegister);
});

const changeToRegister = () => {
  mode = "register";
  $(".login-card").replaceWith(`
    <div class="login-card">
      <h1><b>Register</b></h1>
      <h3>Enter your data</h3>
      <form class="login-form">
        <input required type="text" placeholder="Username"/>
        <input required type="password" placeholder="Password"/>
        <input required type="password" placeholder="Repeat password"/>
        <a id="change-to-login">I'm already registered.</a>
        <button type="submit" class="btn btn-primary btn-lg">Login</button>
      </form>
    </div>
  `);
  $("#change-to-login").on("click", changeToLogin);
};

const changeToLogin = () => {
  mode = "login";
  heightMod = false;
  $(".login-card").replaceWith(`
    <div class="login-card">
      <h1><b>Login</b></h1>
      <h3>Enter your credentials</h3>
      <form class="login-form">
        <input required type="text" placeholder="Username"/>
        <input required type="password" placeholder="Password"/>
        <a id="change-to-register">Are you new here?</a>
        <button type="submit" class="btn btn-primary btn-lg">Login</button>
      </form>
    </div>
  `);
  $("#change-to-register").on("click", changeToRegister);
};