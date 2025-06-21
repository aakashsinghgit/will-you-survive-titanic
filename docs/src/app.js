document.getElementById('titanic-form').onsubmit = function(event) {
  event.preventDefault();
  const age = parseInt(event.target.age.value, 10);
  const sex = event.target.sex.value;
  const pclass = parseInt(event.target.pclass.value, 10);

  // Simple rate limiting: prevent >1 submission per 10 seconds
  const lastSubmit = localStorage.getItem('lastTitanicSubmit') || 0;
  if (Date.now() - lastSubmit < 10000) {
    document.getElementById('result').textContent = 'Please wait before predicting again.';
    return;
  }
  localStorage.setItem('lastTitanicSubmit', Date.now());

  const prob = predictSurvival({age, sex, pclass});
  document.getElementById('result').textContent = 
    prob > 0.5 
      ? `Congratulations! You would have survived. (Chance: ${(prob*100).toFixed(1)}%)` 
      : `Sorry, you likely would not have survived. (Chance: ${(prob*100).toFixed(1)}%)`;
};