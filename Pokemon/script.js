document.addEventListener("DOMContentLoaded", function () {
  const pokemonInput = document.getElementById("pokemon-input");
  const searchButton = document.getElementById("search-button");
  const image = document.getElementById("image");
  const firstCard = document.getElementById("first-card");
  const secondCard = document.getElementById("second-card");
  const poname = document.getElementById("pokemon-name");
  const pokemonInfoDiv = document.getElementById("second-card");
  const imageF = document.getElementById("imagef");

  imageF.src = "icons/pokeball.png";
  firstCard.style.display = "none";
  secondCard.style.display = "none";

  searchButton.addEventListener("click", function () {
    const iconName = pokemonInput.value.trim();

    if (iconName === "") {
      alert("Where is pokemon 🤨");
    } 
    else {
      const iconImagePath = `icons/${iconName}.gif`;
      imageF.style.display = "none";
      firstCard.style.display = "flex";
      secondCard.style.display = "block";

      image.src = iconImagePath;
      image.alt = iconName;
      poname.innerHTML = iconName;

      const img = new Image();
      img.src = iconImagePath;
      img.onload = function () {
        image.src = iconImagePath;
      };
      img.onerror = function () {
        image.src = "icons/sad.gif";
        poname.innerHTML = "Oh noo!";
      };

      fetch("pokemon.json")
        .then((response) => response.json())
        .then((data) => {
          const pokemon = data.find((p) => p.name === iconName.toLowerCase());
          if (pokemon) {
            displayPokemonInfo(pokemon);
          } 
          else {
            displayErrorMessage("Sorry ☹️");
          }
        })
    }
  });

  function displayPokemonInfo(pokemon) {
    const infoHTML = `
      <strong>Name:</strong> ${pokemon.name}<br>
      <hr>
      <strong>Rank:</strong> ${pokemon.rank}<br>
      <hr>
      <strong>Generation:</strong> ${pokemon.generation}<br>
      <hr>
      <strong>Evolves From:</strong> ${pokemon.evolves_from}<br>
      <hr>
      <strong>Type 1:</strong> ${pokemon.type1}<br>
      <hr>
      <strong>Type 2:</strong> ${pokemon.type2}<br>
      <hr>
      <strong>HP:</strong> ${pokemon.hp}<br>
      <hr>
      <strong>Attack:</strong> ${pokemon.atk}<br>
      <hr>
      <strong>Defense:</strong> ${pokemon.def}<br>
      <hr>
      <strong>Special Attack:</strong> ${pokemon.spatk}<br>
      <hr>
      <strong>Special Defense:</strong> ${pokemon.spdef}<br>
      <hr>
      <strong>Speed:</strong> ${pokemon.speed}<br>
      <hr>
      <strong>Total:</strong> ${pokemon.total}<br>
      <hr>
      <strong>Height:</strong> ${pokemon.height}<br>
      <hr>
      <strong>Weight:</strong> ${pokemon.weight}<br>
      <hr>
      <strong>Abilities:</strong> ${pokemon.abilities}<br>
      <hr>
      <strong>Description:</strong> ${pokemon.desc}
    `;
    pokemonInfoDiv.innerHTML = infoHTML;
  }

  function displayErrorMessage(message) {
    pokemonInfoDiv.innerHTML = message;
  }
});
