import dom from '../dom.js';
import getPokemon from '../../API/getPokemon.js';
import createPokemon from '../components/createPokemon.js';
import updatePokemonDom from '../components/updatePokemonDom.js';


const getPokemonHandler = async() => {
    const value = Number(dom.input.value);


    const isValidId = typeof value == 'number' && value > 0 && value < 1280;
    if (!isValidId) {
        dom.error.className = 'error'
        dom.error.innerText = 'Please Enter A Valid Id';
        dom.root.append(dom.error);
        return;
    }

    //remove the err message if it exists
    const errorExist = dom.root.querySelector('.error');
    if(errorExist) {
        dom.error.remove();
    }

    // Get Data
    const pokemonData = await getPokemon(value);

    //check if pokemon exists
    const pokemonDomExist = dom.root.querySelector('#container');
    if(pokemonDomExist){
        updatePokemonDom(pokemonDomExist, pokemonData);
    }else{
        const pokemonDom = createPokemon(pokemonData);
        dom.root.append(pokemonDom);
    }


};

export default getPokemonHandler;
