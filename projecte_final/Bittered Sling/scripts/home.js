
$(window).on("load", () => {

  //Benvinguda i validació
  if (!JSON.parse(localStorage.getItem("logged"))){
    localStorage.setItem("logged", false);
    window.location.href = "../index.html";
  }
  else if (JSON.parse(localStorage.getItem("logged")) === true){
    showSuccess("You have successfully logged in!")
    localStorage.setItem("logged", 1);
  }

  //Extend del navbar
  const nav = document.querySelector("#nav");
  const onScroll = (event) => {
    const scrollPosition = event.target.scrollingElement.scrollTop;
    if (scrollPosition > 10) {
      if (!nav.classList.contains("scrolled-down")) {
        nav.classList.add("scrolled-down");
      }
    } else {
      if (nav.classList.contains("scrolled-down")) {
        nav.classList.remove("scrolled-down");
      }
    }
  };

  document.addEventListener("scroll", onScroll);


});








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