let currentPassengerName = "Passenger";
let currentPassengerTicket = "N/A";

// ... rest of your code ...

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
    name: currentPassengerName,
    ticket: currentPassengerTicket
  };
}

// In DOMContentLoaded:
document.getElementById('randomPassenger').onclick = function () {
  const passenger = randomPassenger();
  setForm(passenger);
  currentPassengerName = passenger.name;
  currentPassengerTicket = passenger.ticket;
  showPlaceholderCard();
  clearResult();
};

// In form submit, no changes needed.