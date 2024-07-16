const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2405-ftb-et-web-ft/`;
// const elementList = document.querySelector("#elements");
const state = {
  puppies: [],
};
const main = document.querySelector("main");
//
//  * Fetches all players from the API. Return array of player objects
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL + "players");
    const json = await response.json();
    return json.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    // TODO
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

async function removePlayer(puppyId) {
  try {
    const players = await fetchAllPlayers();
    const response = await fetch(`${API_URL}players/${puppyId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    renderAllPlayers(players);
    location.reload();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${puppyId} from the roster!`,
      err
    );
  }
}

const renderAllPlayers = (playerList) => {
  const roster = document.createElement("ul");
  if (!playerList.length) {
    roster.innerHTML = "<li>There are no active players right now.</li>";
    return roster.innerHTML;
  }

  playerList.forEach((puppy) => {
    const playerCard = document.createElement("il");
    playerCard.className = "rosterBio";
    playerCard.innerHTML = `<container id="bio"><img src="${puppy.imageUrl}" alt="${puppy.name}" id='puppyImage'/>;
    <h2 id='name'>${puppy.name}</h2>
    <il id='breed'>Breed: ${puppy.breed}</il>
    <il id='id'>ID: ${puppy.id}</il></container>`;

    const buttonContainer = document.createElement("container");
    const seeDetailsButton = document.createElement("button");
    seeDetailsButton.textContent = "See Details";
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    seeDetailsButton.addEventListener("click", (e) => {
      renderSinglePlayer(puppy.id);
    });
    removeButton.addEventListener("click", (e) => {
      removePlayer(puppy.id);
    });

    buttonContainer.append(seeDetailsButton, removeButton);
    playerCard.append(buttonContainer);
    roster.append(playerCard);
  });
  main.replaceChildren(roster);
};

// See Details Button
async function renderSinglePlayer(puppyId) {
  try {
    const response = await fetch(`${API_URL}players/${puppyId}`);
    const json = await response.json();
    const puppy = json.data.player;
    console.log(puppy);
    let { name, id, breed, imageUrl, teamId, status } = puppy;
    teamId == null
      ? (teamId = "unassigned")
      : teamId == 744
      ? (teamId = "Team Ruff")
      : (teamId = "Team Fluff");

    const roster = document.createElement("ul");
    const playerCard = document.createElement("il");
    playerCard.className = "rosterBio";
    playerCard.innerHTML = `<container id="bio"><img src="${imageUrl}" alt="${name}" id='puppyImage'/>;
    <h2 id='name'>${name}</h2>
    <il id='breed'>Breed: ${breed}</il>
    <il id='breed'>${teamId}</il>
    <il id='breed'>Status: ${status}</il>
    <il id='id'>ID: ${id}</il></container>`;

    const backtoRosterButton = document.createElement("button");
    backtoRosterButton.textContent = "Back to Roster";
    backtoRosterButton.addEventListener("click", async (e) => {
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
    });

    playerCard.append(backtoRosterButton);
    roster.append(playerCard);
    main.replaceChildren(roster);
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
}

async function renderNewPlayerForm(onSubmit) {
  const { teamId, imageUrl, team, status, breed, name } = onSubmit;
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2405-ftb-et-web-ft/players",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: name.value,
          imageUrl: imageUrl.value,
          breed: breed.value,
          status: status.value,
          teamId: teamId.value,
        }),
      }
    );
    // location.reload();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
}

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  const onSubmit = document.querySelector("#form");
  onSubmit.addEventListener("submit", (e) => {
    renderNewPlayerForm(onSubmit);
  });
  // renderNewPlayerForm();
};
init();
//
