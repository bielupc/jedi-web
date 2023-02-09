const api = "https://www.thecocktaildb.com/api/json/v1/1/";

//Llistes de filtres
let categoriesList;
let glassList; 
let ingredientsList;
let alcoholicList;

$(window).on("load", async () => {
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

  categoriesList = (await axios.get(api + "list.php?c=list")).data.drinks;
  glassList  = (await axios.get(api + "list.php?g=list")).data.drinks; 
  ingredientsList= (await axios.get(api + "list.php?i=list")).data.drinks;
  alcoholicList= (await axios.get(api + "list.php?a=list")).data.drinks;

  //Search
  $("#search").on("click", handleSearch);
});


const handleSearch = async () => {
  const userInput = ($("#search-input").val()).toLowerCase()

  if (userInput.length === 1){
    const drinks = (await axios.get(api+"search.php?f="+userInput)).data.drinks;
    displayCards(drinks)  
    console.log("1 char")
  }
  else{
    const drinks = (await axios.get(api+"search.php?s="+userInput)).data.drinks;
    if (drinks){
      displayCards(drinks);
    console.log("Normal search")
    }
    else{
      const ingredient = ingredientsList.find(item => (item.strIngredient1).toLowerCase() === userInput);
      if (ingredient){
        const drinks = (await axios.get(api+"filter.php?i="+userInput)).data.drinks;
        displayCards(drinks)
        console.log("Es una ingredient")
      }
      else{
        const categoria = categoriesList.find(item => (item.strCategory).toLowerCase() === userInput);
        if (categoria){
        const drinks = (await axios.get(api+"filter.php?c="+userInput)).data.drinks;
        displayCards(drinks)
          console.log("Es una categoria")
        }
        else{
          const alcoholica = alcoholicList.find(item => (item.strAlcoholic).toLowerCase() === userInput);
          if (alcoholica){
            const drinks = (await axios.get(api+"filter.php?a="+userInput)).data.drinks;
            displayCards(drinks)
            console.log("Es una cat. alcoholica")
          }
          else{
            const glass = glassList.find(item => (item.strGlass).toLowerCase() === userInput);
            if (glass) {
              const drinks = (await axios.get(api+"filter.php?g="+userInput)).data.drinks;
              displayCards(drinks)
              console.log("Es busca un got")
            }
          }
        }
      }
  }
 }


  //Hover disappear
  $(".image").mouseenter(function(e) {
      let id = e.target.parentElement.id;
      $(`#tittle-${id}`).hide();  
  }).mouseleave(function(e) {      
      let id = e.target.parentElement.id;
        $(`#tittle-${id}`).show();
      }
  );
}

  // Display de les opcions 
const displayCards = (drinks) => {
  $(".cards").empty();
  let id = 0;
  drinks.forEach(drink => {
    $(".cards").append(`
      <div class="card" id="${id}">
        <img class="image" src="${drink.strDrinkThumb}" alt="${drink.strDrink} photo">
        <button type="button" class="btn btn-primary btn-lg">Select</button>
        <h2 id="tittle-${id}"class="tittle">${drink.strDrink}</h2>
      </div>
    `);
    id++;
  });
}
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