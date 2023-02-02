const api = "https://jedi-json-server-production.up.railway.app/"
let products = [];

$(window).on("load", async () => {
  try{
    products = (await axios.get(api+"products")).data;
  }
  catch (err){
    console.log(err);
  }

  products.forEach(product => {
    $("#cards-wrapper").append(`
    <div class="card col-1" style="width: 18rem;">
      <img src="${product.img}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title text-center">${product.name}</h5>
        <p class="card-text">${product.price}€</p>
        <div id="${product.name}" class="functional-buttons row pb-2 justify-content-center">
          <button type="button" class="decrement btn btn-success btn-circle btn-lg">
            -
          </button>
          <label id="counter-${product.name}">0</label>
          <button type="button" class="increment btn btn-success btn-circle btn-lg">
            +
          </button>
        </div>
        <div id="purchase-${product.name}">
          <button type="button" class="purchase btn btn-success w-100">ADD TO CART</button>
        </div>
      </div>
    `)
  });

  $(".increment").on("click", e => {
    let id = e.target.parentElement.id;
    let counter = $(`#counter-${id}`).html();
    if (counter < 999) counter++;
    $(`#counter-${id}`).html(counter)
  });

  $(".decrement").on("click", e => {
    let id = e.target.parentElement.id;
    let counter = $(`#counter-${id}`).html();
    if (counter > 0) counter--;
    $(`#counter-${id}`).html(counter);
  });

  $(".purchase").on("click", e => {
    let name = (e.target.parentElement.id).split("-")[1];
    let quantity = $(`#counter-${name}`).html();

    if (quantity > 0){
      let item = products.find(product => product.name === name);
      let spent = item.price * quantity;

      let purchase = {
        product: name,
        id: createUUID(),
        quantity,
        spent
      };

      axios.post(api+"purchases", purchase)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err)
        })
      $(`#counter-${name}`).html("0");
    }
  });
});

function createUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
        const r = (dt + Math.random()*16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (char === 'x' ? r :(r&0x3|0x8)).toString(16);
    });

    return uuid;
}
