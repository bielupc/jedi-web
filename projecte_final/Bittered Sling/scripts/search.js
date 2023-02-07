
$(window).on("load", () => {
  //Extend del navbar i up button
  const nav = document.querySelector("#nav");
  const top = document.getElementById("top");
  const onScroll = (event) => {
    const scrollPosition = event.target.scrollingElement.scrollTop;
    if (scrollPosition > 10) {
      if (!nav.classList.contains("scrolled-down")) {
        nav.classList.add("scrolled-down");
        top.style.display = "block";
      }
    } else {
      top.style.display = "none";
      if (nav.classList.contains("scrolled-down")) {
        nav.classList.remove("scrolled-down");
      }
    }
  };

  document.addEventListener("scroll", onScroll);
});