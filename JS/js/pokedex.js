const searchPokemon = (e) => {
  e.preventDefault();
  fetchPokemon();
};

const fetchPokemon = () => {
  const pokeNameInput = document.getElementById("pokeInput");
  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        console.log(res);
        updatePokeNotFound();
      } else return res.json();
    })
    .then((data) => {
      if (data) {
        console.log(data);
        const name = data.name;
        const image = data.sprites.front_default;
        const types = data.types;
        const stats = data.stats;
        const moves = data.moves;

        updateName(name);
        updateImage(image);
        updateTypes(types);
        updateStats(stats);
        updateMoves(moves);
        showStats();
      }
    });
};

const updateName = (name) => {
  const pokeName = document.getElementById("pokeName");
  pokeName.innerHTML = name.toUpperCase();
};

const updateImage = (url) => {
  const pokePhoto = document.getElementById("pokeImg");
  pokePhoto.src = url;
};

const updateTypes = (typesList) => {
  let types = typesList;
  if (typesList instanceof Object)
    types = typesList.map((obj) => obj.type.name).join(", ");

  const pokeType = document.getElementById("pokeType");
  pokeType.innerText = types;
};

const updateStats = (statsList) => {
  let hp, atk, def, sAtk, sDef, speed;
  if (statsList instanceof Object) {
    hp = statsList[0].base_stat;
    atk = statsList[1].base_stat;
    def = statsList[2].base_stat;
    sAtk = statsList[3].base_stat;
    sDef = statsList[4].base_stat;
    speed = statsList[5].base_stat;
  }

  document.getElementById("hp").innerText = hp;
  document.getElementById("attack").innerText = atk;
  document.getElementById("defense").innerText = def;
  document.getElementById("special-attack").innerText = sAtk;
  document.getElementById("special-defense").innerText = sDef;
  document.getElementById("speed").innerText = speed;
};

const updateMoves = (movesList) => {
  let moves = movesList;
  if (movesList instanceof Object)
    moves = movesList
      .slice(0, 100)
      .map((obj) => obj.move.name)
      .join(", ");

  const pokeMoves = document.getElementById("pokeMoves");
  pokeMoves.innerText = moves;
};

const updatePokeNotFound = () => {
  updateImage("./img/pokemon-sad.gif");
  hideStats();
  updateName("");
  updateTypes("");
  updateStats("");
  updateMoves("");
};

const showStats = () => {
  document.getElementById("pokemon-data").style.visibility = "visible";
}

const hideStats = () => {
  document.getElementById("pokemon-data").style.visibility = "hidden";
}