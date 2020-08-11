function Trainer(name, gender, pokemonTeam) {
  this.name = name;
  this.gender = gender;
  this.pokemonTeam = pokemonTeam;
}

function Pokemon(name, id, image) {
  this.name = name;
  this.id = id;
  this.image = image;
}

// ============================================================

let trainerName = "";
let trainerGender = { text: "", icon: "", img: "" };
let pokemonTeam = { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" };

$("#submitBtn").on("click", function (event) {
  event.preventDefault();

  if ($("#nameInput").val() !== "") {
    trainerName = $("#nameInput").val();
    trainerGender.text = $("#genderSelect").val();
    if (trainerGender.text === "male") {
      trainerGender.icon = "fas fa-mars";
      trainerGender.img =
        "https://cdn.bulbagarden.net/upload/a/a4/Black_White_Hilbert.png";
    } else {
      trainerGender.icon = "fas fa-venus";
      trainerGender.img =
        "https://cdn.bulbagarden.net/upload/6/6f/Black_White_Hilda.png";
    }

    for (var i = 0; i < 6; i++) {
      pokemonTeam[i] = $(`#pokemonInput${i + 1}`)
        .val()
        .toLowerCase();
    }

    const newTrainer = new Trainer(trainerName, trainerGender, pokemonTeam);
    newTrainer.generateTrainerCard();

    // ----------------------------------------------------------

    $("#nameInput").val("");
    for (var j = 1; j <= 6; j++) {
      $(`#pokemonInput${j}`).val("");
    }
    pokemonTeam = {};
  }
});

// ============================================================

const fetchPokemonData = async (trainerName, pokemonName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const res = await fetch(url);
  const data = await res.json();

  const newPokemon = new Pokemon(
    data.name,
    data.order,
    data.sprites.front_default
  );

  createPokemonEntry(trainerName, newPokemon);
};

// ============================================================

function createPokemonEntry(trainerName, pokemon) {
  $(`#pokemonTeam-${trainerName}`).append(`
            <div class="col-4">
                <h6 class="pokemon-name-label">${
                  pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                }</h6>
                <img id="pokemonImg-1" class="pokemon-img" src=${
                  pokemon.image
                } alt="pokemon-${pokemon.name}-img">
            </div>
        `);
}

// ============================================================

Trainer.prototype.generateTrainerCard = function () {
  $("#trainerCardGallery").append(`
        <div id="${trainerName}Card" class="row trainer-card align-items-center">
            <div class="col-3">
                <div class="row">
                    <div class="col-12">
                        <h1 class="trainer-name">${trainerName} <i class="${trainerGender.icon}"></i></h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <img class="user-avatar" src=${trainerGender.img}
                            alt="avatar-img">
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div id="pokemonTeam-${trainerName}" class="row"></div>
            </div>
        </div>
    `);

  for (var x = 0; x < 6; x++) {
    var poke = pokemonTeam[x];
    fetchPokemonData(trainerName, poke);
  }
};
