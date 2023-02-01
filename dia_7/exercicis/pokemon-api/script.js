let url = "https://curso-web-jedi-production.up.railway.app/pokemons"
let id = 0;

$(window).on("load", async function(){
  // Primer pokemon
  try{
    const {data} = await axios.get(url);
    displayPokemon(data[id])
  }
  catch (err){
    console.log(err);
  } 

  // Funció de búsqueda
  $("#search").on("click", async () => {
    const inputVal = $("#busqueda").val();
    try{
      if (!isNaN(inputVal)){
        const {data} = await axios.get(url+`?num=${inputVal}`);
        displayPokemon(data[0]);
      }
      else{
        const {data} = await axios.get(url+`?name=${inputVal}`);
        displayPokemon(data[0]);
      }
    }
    catch (err){
      console.log(err);
    };
  })

  // Següent
  $("#next").on("click", async () => {
    if (id < 6) id++;
    else id = 1;
    const {data} = await axios.get(url+`?id=${id}`);
    displayPokemon(data[0])
  });

  // Anterior
  $("#previous").on("click", async () => {
    if (id > 1) id--;
    else id = 6;
    const {data} = await axios.get(url+`?id=${id}`);
    displayPokemon(data[0])
  });
});

function displayPokemon(pokemon){
  const types = pokemon.types.map( ({type}) => type.name);
  $("#injector").replaceWith(`
  <tr id="injector">
    <td>${pokemon.num}</td>
    <td><img src="${pokemon.images[0].front}"></td>
    <td><img src="${pokemon.images[1].front_shiny}"></td>
    <td>${pokemon.name}</td>
    <td>${types.join(" & ")}</td>
    <td>${pokemon.moves.HM || "None"}</td>
  </tr>
  `);
  id = pokemon.id;
}