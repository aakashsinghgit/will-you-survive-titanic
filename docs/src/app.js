// --- Model Info and Image Paths ---
const MODEL_INFOS = {
  logreg: {
    name: "Logistic Regression",
    desc: "A simple linear model estimating survival probability.",
    img: "images/logreg.png"
  },
  rf: {
    name: "Random Forest",
    desc: "An ensemble of decision trees for robust predictions.",
    img: "images/rf.png"
  },
  svm: {
    name: "Support Vector Machine",
    desc: "Separates survivors and non-survivors with a hyperplane.",
    img: "images/svm.png"
  },
  knn: {
    name: "K-Nearest Neighbors",
    desc: "Predicts survival by comparing with similar passengers.",
    img: "images/knn.png"
  },
  gb: {
    name: "Gradient Boosting",
    desc: "Boosted decision trees for high accuracy.",
    img: "images/gb.png"
  },
  nn: {
    name: "Neural Network",
    desc: "A deep learning model for complex patterns.",
    img: "images/nn.png"
  }
};

// --- Keep track of current random passenger's name and ticket ---
let currentPassengerName = "Passenger";
let currentPassengerTicket = "N/A";

// --- Update Model Info and Add Image ---
function updateModelInfo() {
  const modelKey = document.getElementById('model').value;
  const info = MODEL_INFOS[modelKey];
  const infoBox = document.getElementById('modelInfo');
  let html = `<strong>${info.name}</strong><br>${info.desc}`;
  if (info.img) {
    html += `<div style="margin-top:12px;"><img src="${info.img}" alt="${info.name}" style="max-width:80px;max-height:60px;border-radius:10px;box-shadow:0 2px 10px #abd3fc44;"></div>`;
  }
  infoBox.innerHTML = html;
}

// --- Random Passenger Generator ---
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomPassenger() {
  const pclass = randomFrom([1, 2, 3]);
  const sex = randomFrom(["female", "male"]);
  const age = Math.floor(Math.random() * 74) + 2;
  const sibsp = Math.floor(Math.random() * 4);
  const parch = Math.floor(Math.random() * 3);
  const fare = (Math.random() * 200 + 5).toFixed(2);
  const embarked = randomFrom(["C", "Q", "S"]);
  const firstNamesMale = ["Thomas", "William", "John", "Charles", "George"];
  const firstNamesFemale = ["Mary", "Elizabeth", "Margaret", "Sarah", "Alice"];
  const surnames = ["Smith", "Brown", "Wilson", "Johnson", "Williams"];
  const firstName = sex === "male" ? randomFrom(firstNamesMale) : randomFrom(firstNamesFemale);
  const surname = randomFrom(surnames);
  const name = `${firstName} ${surname}`;
  const ticket = "PC " + (Math.floor(Math.random() * 89999) + 10000);
  return { pclass, sex, age, sibsp, parch, fare, embarked, name, ticket };
}

// --- Fill the Form with Random Passenger ---
function setForm(passenger) {
  document.getElementById('pclass').value = passenger.pclass;
  document.getElementById('sex').value = passenger.sex;
  document.getElementById('age').value = passenger.age;
  document.getElementById('sibsp').value = passenger.sibsp;
  document.getElementById('parch').value = passenger.parch;
  document.getElementById('fare').value = passenger.fare;
  document.getElementById('embarked').value = passenger.embarked;
}

// --- Get Passenger Data from Form ---
// Uses currentPassengerName and currentPassengerTicket
function getPassengerFromForm() {
  return {
    pclass: parseInt(document.getElementById('pclass').value, 10),
    sex: document.getElementById('sex').value,
    age: parseInt(document.getElementById('age').value, 10),
    sibsp: parseInt(document.getElementById('sibsp').value, 10),
    parch: parseInt(document.getElementById('parch').value, 10),
    fare: parseFloat(document.getElementById('fare').value),
    embarked: document.getElementById('embarked').value,
    name: currentPassengerName,
    ticket: currentPassengerTicket
  };
}

// --- Avatar Generator (Dicebear) ---
function getAvatarUrl(sex, age, pclass) {
  const seed = encodeURIComponent(`${sex}${age}${pclass}${Math.random()}`);
  let options = "";
  if (sex === "female") options += "&hair=long&lipColor=red";
  if (sex === "male") options += "&beardProbability=20";
  if (pclass == 1) options += "&glassesProbability=13";
  if (age < 12) options += "&mouth=smileBig";
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}${options}`;
}

// --- Narrative Generator ---
function generateNarrative(passenger, survived) {
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

// --- Show Passenger Card in Right Panel ---
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

// --- Show Placeholder Ship Card ---
function showPlaceholderCard() {
  document.getElementById('passengerCard').innerHTML = `
    <div class="placeholder-card" id="waitingShip">
      <div style="font-size:2.3rem;line-height:1;">🛳️</div>
      <div style="margin-top:10px; font-size:1.03rem;">
        Ready to set sail!<br>Fill the form and predict survival.
      </div>
    </div>
  `;
}

// --- Clear Result Display ---
function clearResult() {
  const result = document.getElementById('result');
  result.classList.remove("survived", "not-survived");
  result.textContent = "";
}

// --- Main Event Listeners ---
document.addEventListener("DOMContentLoaded", function() {
  // Model selector
  document.getElementById('model').addEventListener('change', updateModelInfo);
  updateModelInfo();

  // Random passenger
  document.getElementById('randomPassenger').onclick = function () {
    const passenger = randomPassenger();
    setForm(passenger);
    currentPassengerName = passenger.name;
    currentPassengerTicket = passenger.ticket;
    showPlaceholderCard();
    clearResult();
  };

  // Show ship on load
  showPlaceholderCard();

  // Passenger form submission
  document.getElementById('titanic-form').onsubmit = function (e) {
    e.preventDefault();
    const passenger = getPassengerFromForm();
    const resultEl = document.getElementById('result');

    if (
      !passenger.pclass || !passenger.sex ||
      isNaN(passenger.age) || isNaN(passenger.sibsp) ||
      isNaN(passenger.parch) || isNaN(passenger.fare) ||
      !passenger.embarked
    ) {
      resultEl.classList.remove("survived", "not-survived");
      resultEl.textContent = "❗ Please fill in all fields with valid values.";
      return;
    }

    clearResult();

    // Use the selected model to predict (predictSurvival defined in model.js)
    const modelKey = document.getElementById('model').value;
    const prob = predictSurvival(passenger, modelKey);

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
});