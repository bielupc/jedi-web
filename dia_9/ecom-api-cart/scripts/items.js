const api = "https://jedi-json-server-production.up.railway.app/"
let products = [];
let cart = [];
let total = 0;


$(window).on("load", async () => {
  let preCart = JSON.parse(localStorage.getItem("cart"));
  if (preCart){
    cart = preCart;
    total = JSON.parse(localStorage.getItem("total"));
  }
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
    let quantity = parseInt($(`#counter-${name}`).html());

    if (quantity > 0){
      let item = products.find(product => product.name === name);

      let purchase = {
        product: name,
        id: item.id,
        price: item.price,
        quantity
      };
      addToCart(purchase);
      $(`#counter-${name}`).html("0");
    }
  });

  $("#toggle-cart").on("click", () => {
    $("#cart-items").empty()
    cart.forEach(item => {
      $("#cart-items").append(`
      <div class="cart-item row">
        <h1>${item.product}</h1>
        <h4>quantity: ${item.quantity}</h4>
        <h4>added price: ${item.price * item.quantity}€</h4>
        <hr>
      </div>
      `);
    });
    if (total > 0){
      $("#price-row").replaceWith(`
        <div id="price-row" class="row p-4 justify-content-center">
          <h1 class="col p-4">Total price: <span>${total}€</span></h1>
          <button id="checkout" type="button" class="btn btn-light w-75">MAKE PURCHASE</button>
        </div>
    `);
    }
    $("#checkout").on("click", () => {
      if (total > 0){
        let userCart = {
          id: createUUID(),
          cart,
          total
        };
        axios.post(api+"carts", userCart)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
  });
});
  

$(window).on('beforeunload', function(){
  console.log("A")
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", JSON.stringify(total));
});


function createUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
        const r = (dt + Math.random()*16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (char === 'x' ? r :(r&0x3|0x8)).toString(16);
    });

    return uuid;
};

function addToCart(purchase){
  let duplicate = cart.find(item => item.product === purchase.product);
  if (duplicate) {
    total += purchase.price * purchase.quantity;
    duplicate.quantity += purchase.quantity;
  }
  else{
    cart.push(purchase);
    total += purchase.price * purchase.quantity;
  }
}