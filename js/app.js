const poKemonName = document.querySelector('.poKemon__name');
const poKemonNumber = document.querySelector('.poKemon__number');
const poKemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    poKemonName.innerHTML = 'Loading...';
    poKemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if  (data) {
        poKemonImage.style.display = 'block';
        poKemonName.innerHTML = data.name;
        poKemonNumber.innerHTML = data.id;
        poKemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id
    } else {
        poKemonName.style.display = 'none';
        poKemonName.innerHTML = 'Not found :c';
        poKemonNumber.innerHTML = ''
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefaut();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);