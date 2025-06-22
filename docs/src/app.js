// Avatar generator with DiceBear API, and random name generator
const DICEBEAR_BASE = "https://api.dicebear.com/7.x/adventurer/svg";

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPassenger() {
  // Some simple random generators
  const pclass = randomFrom([1, 2, 3]);
  const sex = randomFrom(["female", "male"]);
  const age = Math.floor(Math.random() * 74) + 2; // realistic age
  const sibsp = Math.floor(Math.random() * 4);
  const parch = Math.floor(Math.random() * 3);
  const fare = (Math.random() * 200 + 5).toFixed(2);
  const embarked = randomFrom(["C", "Q", "S"]);
  // Generate a random name
  const firstNamesMale = ["Thomas", "William", "John", "Charles", "George", "Edward", "Frederick", "Henry", "Albert", "James"];
  const firstNamesFemale = ["Mary", "Elizabeth", "Margaret", "Sarah", "Alice", "Dorothy", "Edith", "Emily", "Helen", "Annie"];
  const surnames = ["Smith", "Brown", "Wilson", "Johnson", "Williams", "Jones", "Taylor", "Davies", "Evans", "Thomas", "Roberts"];
  const firstName = sex === "male" ? randomFrom(firstNamesMale) : randomFrom(firstNamesFemale);
  const surname = randomFrom(surnames);
  const name = `${firstName} ${surname}`;
  // Generate random ticket number
  const ticket = "PC " + (Math.floor(Math.random() * 89999) + 10000);
  return { pclass, sex, age, sibsp, parch, fare, embarked, name, ticket };
}

function setForm(passenger) {
  document.getElementById('pclass').value = passenger.pclass;
  document.getElementById('sex').value = passenger.sex;
  document.getElementById('age').value = passenger.age;
  document.getElementById('sibsp').value = passenger.sibsp;
  document.getElementById('parch').value = passenger.parch;
  document.getElementById('fare').value = passenger.fare;
  document.getElementById('embarked').value = passenger.embarked;
}

function getPassengerFromForm() {
  return {
    pclass: parseInt(document.getElementById('pclass').value, 10),
    sex: document.getElementById('sex').value,
    age: parseInt(document.getElementById('age').value, 10),
    sibsp: parseInt(document.getElementById('sibsp').value, 10),
    parch: parseInt(document.getElementById('parch').value, 10),
    fare: parseFloat(document.getElementById('fare').value),
    embarked: document.getElementById('embarked').value,
  };
}

function getAvatarUrl(sex, age, pclass) {
  // Use DiceBear with seed based on sex/age/pclass for variety and repeatability
  const seed = encodeURIComponent(`${sex}${age}${pclass}${Math.random()}`);
  let options = "";
  if (sex === "female") options += "&hair=long&lipColor=red";
  if (sex === "male") options += "&beardProbability=20";
  if (pclass == 1) options += "&glassesProbability=13";
  if (age < 12) options += "&mouth=smileBig";
  return `${DICEBEAR_BASE}?seed=${seed}${options}`;
}

function generateNarrative(passenger, survived) {
  // Use inputs to build a narrative
  const classes = {1: "First", 2: "Second", 3: "Third"};
  const ports = {C: "Cherbourg", Q: "Queenstown", S: "Southampton"};
  const sentences = [
    survived
      ? `Against all odds, ${passenger.name} survived the icy Atlantic night.`
      : `Tragically, ${passenger.name} was lost to the sea.`,
    survived
      ? `Their ${classes[passenger.pclass]} Class ticket may have helped, but courage and luck played their part.`
      : `Despite being in ${classes[passenger.pclass]} Class, fate was not on their side.`,
    `Aged ${passenger.age}, ${passenger.sex === "female" ? "she" : "he"} boarded at ${ports[passenger.embarked]}.`,
    passenger.sibsp > 0
      ? `${passenger.sex === "female" ? "She" : "He"} was accompanied by ${passenger.sibsp} sibling${passenger.sibsp > 1 ? "s" : ""} or spouse.`
      : `${passenger.sex === "female" ? "She" : "He"} travelled alone, with no siblings or spouse aboard.`,
    passenger.parch > 0
      ? `Also with ${passenger.parch} parent${passenger.parch > 1 ? "s" : ""} or child${passenger.parch > 1 ? "ren" : ""}.`
      : "",
    `Their fare was £${parseFloat(passenger.fare).toFixed(2)}, and their ticket number was ${passenger.ticket || "N/A"}.`
  ];
  return sentences.filter(Boolean).join(" ");
}

function showPassengerCard(passenger, survived) {
  const avatarUrl = getAvatarUrl(passenger.sex, passenger.age, passenger.pclass);
  const fateText = survived ? "Survived" : "Did Not Survive";
  const fateClass = survived ? "survived" : "not-survived";
  const narrative = generateNarrative(passenger, survived);
  const classes = {1: "First", 2: "Second", 3: "Third"};
  const ports = {C: "Cherbourg", Q: "Queenstown", S: "Southampton"};
  document.getElementById('passengerCard').innerHTML = `
    <div class="passenger-header">
      <img class="passenger-avatar" src="${avatarUrl}" alt="Avatar of ${passenger.name}" />
      <div class="passenger-details">
        <div class="passenger-name">${passenger.name}</div>
        <div class="passenger-fate ${fateClass}">${survived ? "🟢" : "🔴"} ${fateText}</div>
      </div>
    </div>
    <div class="passenger-stats">
      <div class="passenger-stat">Age: ${passenger.age}</div>
      <div class="passenger-stat">Sex: ${passenger.sex[0].toUpperCase() + passenger.sex.slice(1)}</div>
      <div class="passenger-stat">Class: ${classes[passenger.pclass]}</div>
      <div class="passenger-stat">Sib/Sp: ${passenger.sibsp}</div>
      <div class="passenger-stat">Par/Ch: ${passenger.parch}</div>
      <div class="passenger-stat">Fare: £${parseFloat(passenger.fare).toFixed(2)}</div>
      <div class="passenger-stat">Embarked: ${ports[passenger.embarked]}</div>
      <div class="passenger-stat">Ticket: ${passenger.ticket || "N/A"}</div>
    </div>
    <div class="passenger-story">${narrative}</div>
  `;
}

function showPlaceholderCard() {
  const card = document.getElementById('passengerCard');
  card.innerHTML = `
    <div class="placeholder-card" id="waitingShip">
      <div style="font-size:3.1rem;line-height:1;">🛳️</div>
      <div style="margin-top:12px; font-size:1.13rem;">
        Ready to set sail!<br>Fill the form and predict survival.
      </div>
    </div>
  `;
}
function hidePlaceholderCard() {
  const placeholder = document.getElementById('waitingShip');
  if (placeholder) {
    placeholder.classList.add('fadeout');
    setTimeout(() => {
      if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);
    }, 500); // match transition duration
  }
}

function hidePassengerCard() {
  document.getElementById('passengerCard').innerHTML = "";
}
function clearResult() {
  const result = document.getElementById('result');
  result.classList.remove("survived", "not-survived");
  result.textContent = "";
}

function getPassengerWithIdentity() {
  // Get data from form, but add name/ticket if available from last random
  const passenger = getPassengerFromForm();
  // Retrieve stored random name/ticket if present
  const lastRandom = JSON.parse(localStorage.getItem('lastRandomPassenger') || '{}');
  if (lastRandom && lastRandom.name && lastRandom.ticket) {
    passenger.name = lastRandom.name;
    passenger.ticket = lastRandom.ticket;
  } else {
    // fallback: generate new
    const random = randomPassenger();
    passenger.name = random.name;
    passenger.ticket = random.ticket;
  }
  return passenger;
}

document.addEventListener("DOMContentLoaded", function() {
  // Model info update
  function updateModelInfo() {
    const model = document.getElementById('model').value;
    const info = typeof MODEL_INFOS !== "undefined" ? MODEL_INFOS[model] : "";
    document.getElementById('modelInfo').textContent = info || "";
  }
  document.getElementById('model').addEventListener('change', updateModelInfo);
  updateModelInfo();

  // Show ship placeholder on the right panel at load
  showPlaceholderCard();
});

document.getElementById('randomPassenger').onclick = function () {
  const passenger = randomPassenger();
  setForm(passenger);
  localStorage.setItem('lastRandomPassenger', JSON.stringify({
    name: passenger.name,
    ticket: passenger.ticket,
  }));
  hidePassengerCard();
  clearResult();
  showPlaceholderCard();
};

document.getElementById('titanic-form').onsubmit = function (e) {
  e.preventDefault();

  const passenger = getPassengerWithIdentity();
  const resultEl = document.getElementById('result');

  if (
    !passenger.pclass ||
    !passenger.sex ||
    isNaN(passenger.age) ||
    isNaN(passenger.sibsp) ||
    isNaN(passenger.parch) ||
    isNaN(passenger.fare) ||
    !passenger.embarked
  ) {
    resultEl.classList.remove("survived", "not-survived");
    resultEl.textContent = "❗ Please fill in all fields with valid values.";
    return;
  }

  hidePlaceholderCard();
  hidePassengerCard();
  clearResult();

  const lastSubmit = parseInt(localStorage.getItem('lastTitanicSubmit') || "0", 10);
  if (Date.now() - lastSubmit < 10000) {
    resultEl.classList.remove("survived", "not-survived");
    resultEl.textContent = "⏱️ Please wait a few seconds before predicting again.";
    return;
  }
  localStorage.setItem('lastTitanicSubmit', Date.now().toString());

  const modelKey = document.getElementById('model').value;
  const prob = predictSurvivalMulti(passenger, modelKey);

  if (prob > 0.5) {
    resultEl.textContent = `🎉 Survived! Chance: ${(prob * 100).toFixed(1)}%`;
    resultEl.classList.add("survived");
    resultEl.classList.remove("not-survived");
  } else {
    resultEl.textContent = `💧 Did not survive. Chance: ${(prob * 100).toFixed(1)}%`;
    resultEl.classList.add("not-survived");
    resultEl.classList.remove("survived");
  }
  showPassengerCard(passenger, prob > 0.5);
};