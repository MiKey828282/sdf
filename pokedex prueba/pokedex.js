const URL = "https://pokeapi.co/api/v2/pokemon/"

const searchinput = document.getElementById("search");
const pokedexcontainer = document.getElementById("Pokedex");
 //para mostrar el mensaje de error si escribes algo mal
function showError(msg){
    pokedexcontainer.innerHTML = `<p class="error">${msg}</p>`;
}
//funcion para buscar al poke
async function searchpokemon(){
    const searchedpokemon = searchinput.value.toLocaleLowerCase();

    try {
        //para decirle a la api de pokemon que me lo de con el nombre o id
        const response = await fetch(URL + searchedpokemon)

        if(!response.ok){
            //mensaje para mostrar error de que no hay nada de eso 
            showError(`No se encontro ningun pokemon llamado:   ${searchedpokemon}`);
            return;
        }

        const data = await response.json();
        //datos del pokemon
        pokedexcontainer.innerHTML = 
        `
           <h2>${data.name.toUpperCase()}</h2>
           <img src="${data.sprites.front_default}">
           <hr>
           <p>Numero:${data.id}</p>
           <hr>
           <p>Altura: ${data.height / 10}m</p>
           <hr>
           <p>Peso: ${data.weight / 10}kg</p>

        `;
    } catch (error) {
        //mensaje de error si no se escribe nada 
        console.error(error);
        showError('Ha ocurrido un error al buscar el Pokemon')
    }
}

document.getElementById("btn-search").addEventListener("click", searchpokemon)