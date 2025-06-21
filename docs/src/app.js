const form = document.getElementById('titanic-form');
const resultEl = document.getElementById('result');

form.onsubmit = function (e) {
  e.preventDefault();

  // Client-side limiter: 10 seconds between submits
  const lastSubmit = parseInt(localStorage.getItem('lastTitanicSubmit') || "0", 10);
  if (Date.now() - lastSubmit < 10000) {
    resultEl.className = "result visible";
    resultEl.textContent = "⏱️ Please wait a few seconds before predicting again.";
    return;
  }
  localStorage.setItem('lastTitanicSubmit', Date.now().toString());

  const pclass = parseInt(form.pclass.value, 10);
  const sex = form.sex.value;
  const age = parseInt(form.age.value, 10);

  if (!pclass || !sex || isNaN(age)) return;

  const prob = predictSurvival({ pclass, sex, age });
  resultEl.classList.remove("survived", "not-survived", "visible");
  setTimeout(() => {
    if (prob > 0.5) {
      resultEl.textContent = `🎉 Survived! Chance: ${(prob * 100).toFixed(1)}%`;
      resultEl.classList.add("survived");
    } else {
      resultEl.textContent = `💧 Did not survive. Chance: ${(prob * 100).toFixed(1)}%`;
      resultEl.classList.add("not-survived");
    }
    resultEl.classList.add("visible");
  }, 130);
};