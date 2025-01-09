const API_BASE_URL = "https://thronesapi.com/api/v2/Characters";

// Fetch character data and initialize the page
async function fetchCharacters() {
  try {
    const response = await fetch(API_BASE_URL);
    const characters = await response.json();
    populateCharacterList(characters);
    displayCharacterDetails(characters[0]);
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

// Populate the character list in the table
function populateCharacterList(characters) {
  const tableBody = document.querySelector("#characterTable tbody");
  tableBody.innerHTML = "";

  characters.forEach((character) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${character.id}</td>
      <td>${character.firstName} ${character.lastName}</td>
      <td><img src="${character.imageUrl}" alt="${character.fullName}"></td>
    `;

    // Add click event to display character details
    row.addEventListener("click", () => displayCharacterDetails(character));
    tableBody.appendChild(row);
  });
}

// Display character details in the detail section
function displayCharacterDetails(character) {
  const detailContainer = document.getElementById("characterDetail");
  detailContainer.innerHTML = `
    <h3>${character.fullName}</h3>
    <img src="${character.imageUrl}" alt="${character.fullName}">
    <p><strong>ID:</strong> ${character.id}</p>
    <p><strong>First Name:</strong> ${character.firstName}</p>
    <p><strong>Last Name:</strong> ${character.lastName}</p>
    <p><strong>Title:</strong> ${character.title || "N/A"}</p>
    <p><strong>Family:</strong> ${character.family || "N/A"}</p>
    <p><strong>Image:</strong> ${character.image}</p>
    <p><strong>Image URL:</strong> <a href="${character.imageUrl}" target="_blank">${character.imageUrl}</a></p>
  `;
}

// Initialize the page when loaded
document.addEventListener("DOMContentLoaded", fetchCharacters);
