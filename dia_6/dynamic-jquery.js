const data = [{
    id: 1,
    url: "https://img.huffingtonpost.com/asset/5e144cb124000041245a51f2.jpeg?ops=1778_1000",
    title: "Baby Yoda Poster",
    alt: "bby_yoda",
    desc: "Some quick example text to build on the card title and make up the bulk of the card's content."
},{
    id: 2,
    url: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2021/01/The-Mandalorian-portada-scaled.jpeg?fit=2560%2C1440&quality=50&strip=all&ssl=1",
    title: "Mandalorian Poster",
    alt: "mandalorian",
    desc: "Some quick example text to build on the card title and make up the bulk of the card's content."
},{
    id: 3,
    url: "https://as01.epimg.net/meristation/imagenes/2021/11/01/noticias/1635779398_890000_1635779670_noticia_normal.jpg",
    title: "Boba Fett Poster",
    alt: "boba_fett",
    desc: "Some quick example text to build on the card title and make up the bulk of the card's content."
}]

$(window).on('load', () => {
    data.forEach(element => {
        $('#cards-wrapper').append (
            `<article class="row mx-0 col-md-6 col-lg-4 col-xs-12 justify-content-center">
                <div class="card row mx-0 px-0" style="width: 18rem;">
                    <img 
                        class="product-img card-img-top px-0" alt=${element.alt} 
                        src=${element.url} 
                    >
                    <div class="card-body px-2">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.desc}</p>
                    </div>
                    <div class="col-12 px-2">
                        <form class="row mx-0 px-0 justify-content-around">
                            <button type="button" class="btn btn-danger p-1 card-actions">-</button>
                            <input type="number" min="0" placeholder="0" class="item-count w-75">
                            <button type="button" class="btn btn-success p-1 card-actions">+</button>
                            <button type="submit" class="btn btn-primary btn-block my-2"> ADD TO CART </button>
                        </form>
                    </div>
                </div>
            </article>`
        )
    });
})