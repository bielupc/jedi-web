let id = 1;
let pkmns = [];
const url = 'https://curso-web-jedi-production.up.railway.app/pokemons';

const load = pokemon => {
    if (!pokemon) return;

    // const regular = pokemon.images[0];
    // const shiny = pokemon.images[1];
    const [ regular, shiny ] = pokemon.images;

    // const pkm_types = [];
    // for(let i = 0; i<pokemon.types.length; i++){
    //   pkm_types.push( pokemon.types[i].type.name ); 
    // }

    const pkm_types = pokemon.types.map( ({ type }) => type.name);

    // let HM;
    // if(pokemon.moves.HM !== null) 
    //     HM = pokemon.moves.HM;
    // else 
    //     HM = 'null';

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
        pkmns = (await axios.get(`${url}`)).data;
        load( pkmns[0] );
    } catch (error) {
        console.log(error)
    }

    $('#previous').on("click", async () => {
        if (id > 1) --id;
        else if (id === 1) id = 6;
        load( pkmns.find(poke => poke.id === id) );
    });

    $('#send-search').on("click", async () => {
        var inputVal = $('#search').val();
        if(isNaN(inputVal)) load(pkmns.find(poke => poke.name === inputVal));
        else load(pkmns.find(poke => poke.num === parseInt(inputVal)));
    });

    $('#next').on("click", async () => {
        if (id < 6) ++id;
        else if (id === 6) id = 1;
        load( pkmns.find(poke => poke.id === id) );
    });
});

function createUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}