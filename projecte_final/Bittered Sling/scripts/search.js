const api = "https://www.thecocktaildb.com/api/json/v1/1/";

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

  // Llistes de filtres
  categoriesList = (await axios.get(api + "list.php?c=list")).data.drinks;
  glassList  = (await axios.get(api + "list.php?g=list")).data.drinks; 
  ingredientsList= (await axios.get(api + "list.php?i=list")).data.drinks;
  alcoholicList= (await axios.get(api + "list.php?a=list")).data.drinks;

  // Enter també activa el botó de búsqueda 
  $('.form-control').keypress(function (e) {                                       
       if (e.which == 13) {
          e.preventDefault();
          $(".search").click();
       }
  });

  //Search
  $("#search").on("click", handleSearch);
  $("#random").on("click", async () => {
    let drinks = [];
    for (let i=0; i<4; i++){
      drinks.push((await axios.get(api + "random.php")).data.drinks[0]);
    }
    displayCards(drinks);

    //Hover disappear
    $(".image").mouseenter(function(e) {
        let id = e.target.parentElement.id;
        $(`#tittle-${id}`).hide();  
    }).mouseleave(function(e) {      
        let id = e.target.parentElement.id;
          $(`#tittle-${id}`).show();
        }
    );
    });


});


const handleSearch = async () => {
  const userInput = ($("#search-input").val())
  if (!userInput){
    console.log("Not valid")
  }
  else{
    userInput.toLowerCase()
    if (userInput.length === 1){
      const drinks = (await axios.get(api+"search.php?f="+userInput)).data.drinks;
      displayCards(drinks)  
      console.log("1 char")
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
          const drink = (await axios.get(api+"search.php?s="+userInput)).data.drinks;
          if (drink){
            displayCards(drink);
            console.log("Normal search")
          }
          else{
            const alcoholica = alcoholicList.find(item => (item.strAlcoholic).toLowerCase() === userInput);
            if (alcoholica){
              const drinks = (await axios.get(api+"filter.php?a="+userInput)).data.drinks;
              displayCards(drinks)
              console.log("Es una cat. alcohol")
            }
            else{
              const glass = glassList.find(item => (item.strGlass).toLowerCase() === userInput);
              if (glass) {
                const drinks = (await axios.get(api+"filter.php?g="+userInput)).data.drinks;
                displayCards(drinks)
                console.log("Es un got")
              }
              else{
                $(".cards").replaceWith(`
                <div class="cards">
                  <img src="../assets/not-found.svg" alt="not found" style="height: 50%;" class="img-fluid">
                </div>
                `);
                console.log("Not found!")
              }
            }
          }
        }
    }
  }
 }
}

// Display de les opcions 
const displayCards = (drinks) => {
  $(".cards").empty();
  let id = 0;
  drinks.forEach(async (drink) => {

    // Si es busca per filtres falten dades
    if (!drink.strInstructions){
      drink = (await axios.get(api+"lookup.php?i="+drink.idDrink)).data.drinks[0];
    }

    // Etiquetes
    let tags = [drink.strAlcoholic, drink.strCategory];
    if (drink.strIBA){
      tags.push(drink.strIBA);
    }
    if (drink.strTags) {
      let splitted = drink.strTags.split(",");
      splitted.map(tag => tags.push(tag))
    }

    // Ingredients
    let ingredients = [];
    let quantity = [];

    let i = 1;
    let selector = "strIngredient1"
    while (drink[selector] !== null){
      ingredients.push((drink[selector]));
      quantity.push(drink["strMeasure"+String(i)]);
      i++
      selector = "strIngredient"+String(i)
    }

    $(".cards").append(`
      <div class="card d-flex" id="${id}">
        <img class="image" src="${drink.strDrinkThumb}" alt="${drink.strDrink} photo">
        <button id="select-${id}" class="btn btn-primary btn-lg" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop-${id}" aria-controls="offcanvasTop">Select</button>
        <div class="desplegable offcanvas offcanvas-top justify-content-center align-items-center" tabindex="-1" id="offcanvasTop-${id}" aria-labelledby="offcanvasTopLabel">
          <div class="offcanvas-header d-flex justify-content-center align-items-center flex-column">
            <h1>${drink.strDrink}</h1>
            <h5>${tags.join(" | ")}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <p class="row">${drink.strInstructions} This drink should be properly served with a ${drink.strGlass}.</p>
            <div class="row graphic">
              <img class="col" src="${drink.strDrinkThumb}">
              <div class="col d-flex justify-content-start align-items-center flex-column">
                <h4 class="ingredients">Ingredients</h4>
                <ul class="ingredients-${id}">
                </ul>
              </div>
            </div> 
          </div>
        </div> 
        <h2 id="tittle-${id}" class="tittle">${drink.strDrink}</h2>
      </div>

      
    `);

    //Afegim els ingredients
    for(let i = 0; i < ingredients.length; i++){
      $(`.ingredients-${id}`).append(`
        <li>&#x2022; ${ingredients[i]} (${!! quantity[i] ? quantity[i]: 'free choice'})</li>
      `);
    }
    id++;
  });

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
