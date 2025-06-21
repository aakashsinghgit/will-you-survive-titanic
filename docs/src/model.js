// Simple demo model using Titanic-like features
function predictSurvival({ pclass, sex, age, sibsp, parch, fare, embarked }) {
  let score = -1.2;
  if (sex === "female") score += 2.5;
  if (pclass == 1) score += 1.0;
  if (pclass == 2) score += 0.1;
  if (pclass == 3) score -= 0.7;
  if (age < 13) score += 0.6;
  if (age > 50) score += 0.2;
  score -= sibsp * 0.1;
  score -= parch * 0.08;
  if (fare > 50) score += 0.3;
  if (embarked === "C") score += 0.13;
  if (embarked === "Q") score -= 0.04;
  if (embarked === "S") score += 0.01;
  // Sigmoid for probability
  const prob = 1 / (1 + Math.exp(-score));
  return Math.max(0, Math.min(1, prob));
}