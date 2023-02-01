let id = 1;
const url = 'https://curso-web-jedi-production.up.railway.app/pokemons';

const load = pokemon => {
    if (!pokemon) return;

    // var regular = pokemon.images[0];
    // var shiny = pokemon.images[1];
    const [ regular, shiny ] = pokemon.images;

    // var pkm_types = [];
    // for(let i = 0; i<pokemon.types.length; i++){
    //   pkm_types.push( pokemon.types[i].type.name ); 
    // }

    const pkm_types = pokemon.types.map( ({ type }) => type.name);


    // let HM;
    // if(pokemon.moves.HM !== null) 
    //     HM = pokemon.moves.HM;
    // else 
    //     HM = 'None';

    

    $('#api-data').replaceWith(
        `<tr id="api-data">
            <th scope="row" class="center">${pokemon.num}</th>
            <td class="center sprite">
                <img src="${regular.front}" alt="${pokemon.name}">
            </td>
            <td class="center sprite">
                <img src="${shiny.front_shiny}" alt="${pokemon.name}">
            </td>
            <td class="center">${pokemon.name}</td>
            <td class="center"> ${ pkm_types.join(' & ') } </td>
            <td class="center"> ${ pokemon.moves.HM || 'None' } </td>
        </tr>`
    );

    id = pokemon.id;
};

$(window).on("load",  async () => {
    try {
        const { data } = await axios.get(`${url}/${id}`);
        load( data );
    } catch (error) {
        console.log(err)
    }

    $('#previous').on("click", async () => {
        try {
            if (id > 1) --id;
            else if (id === 1) id = 6;
            const { data } = await axios.get(`${url}/${id}`);
            load( data );
        } catch (error) {
            console.log(error)
        }
    });

    $('#send-search').on("click", async () => {
        const inputVal = $('#search').val();
        try {
            const { data } = await axios.get(`${url}?${ isNaN(inputVal) ? "name":"num"}=${inputVal}`);
            if (Object.keys(data).length === 0) alert('No results found');
            else load(data[0]);
        } catch (error) {
            console.log(error)
        }
    });

    $('#next').on("click", async () => {
        try {
            if (id < 6) ++id;
            else if (id === 6) id = 1;
            const { data } = await axios.get(`${url}/${id}`);
            load( data );
        } catch (error) {
            console.log(error)
        }
    });
});