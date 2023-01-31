const products = [
  {
  id: 1,
  title: "Pera",
  description: "this is a description",
  img_url: "https://galafruit.net/wp-content/uploads/galafruit_pere.jpg"
  },
  {
    id: 2,
    title: "Poma",
    description: "this is a description",
    img_url: "https://www.vadeplats.com/wp-content/uploads/2019/04/6000200094514.jpg"
  },
  {
    id: 3,
    title: "Piña",
    description: "this is a description",
    img_url: "https://www.bobtailfruit.co.uk/pub/media/catalog/product/cache/118fd06640efc949eafa2123c39b08e3/p/i/pineapple.jpg"
  },
  {
    id: 4,
    title: "Kiwi",
    description: "this is a a description",
    img_url: "https://m.media-amazon.com/images/I/51bQKPgp3wL._AC_SX425_.jpg"
  },
  {
    id: 4,
    title: "Kiwi",
    description: "this is a a description",
    img_url: "https://m.media-amazon.com/images/I/51bQKPgp3wL._AC_SX425_.jpg"
  }, 
  {
    id: 4,
    title: "Kiwi",
    description: "this is a a description",
    img_url: "https://m.media-amazon.com/images/I/51bQKPgp3wL._AC_SX425_.jpg"
  }
];

$( window ).on( "load", function() {
  products.forEach(function(product){
    $("#main").append(`
    <div class="card">
      <img src="${product.img_url}" class="card-img-top" alt="product image">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <a href="#" class="btn btn-success">ADD TO CART</a>
      </div>
    </div>
    `);
  });
})

