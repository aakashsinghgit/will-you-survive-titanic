// Simple logistic regression weights for Titanic (example, adjust as needed)
function predictSurvival({age, sex, pclass}) {
  // Example weights (not real, for demo)
  let score = -3;
  score += (sex === "female") ? 2.5 : -1.2;
  score += (pclass == 1) ? 1.5 : (pclass == 2 ? 0.5 : -1);
  score += (age < 16) ? 1 : (age > 50 ? 0.5 : 0);
  // Sigmoid to get probability
  const prob = 1 / (1 + Math.exp(-score));
  return prob;
}