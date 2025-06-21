document.getElementById('titanic-form').onsubmit = function (e) {
  e.preventDefault();
  const pclass = parseInt(document.getElementById('pclass').value, 10);
  const sex = document.getElementById('sex').value;
  const age = parseInt(document.getElementById('age').value, 10);

  // Basic validation
  if (!pclass || !sex || isNaN(age)) return;

  const prob = predictSurvival({ pclass, sex, age });
  const result = document.getElementById('result');
  if (prob > 0.5) {
    result.className = "result survived";
    result.textContent = `Survived! Chance: ${(prob * 100).toFixed(1)}%`;
  } else {
    result.className = "result not-survived";
    result.textContent = `Did not survive. Chance: ${(prob * 100).toFixed(1)}%`;
  }
};