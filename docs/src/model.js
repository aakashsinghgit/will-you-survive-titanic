// Simple Titanic survival model (demo)
// Input: {pclass: 1, sex: "female", age: 29}
function predictSurvival({ pclass, sex, age }) {
  let score = -1.5; // base
  if (sex === "female") score += 2.5;
  if (pclass == 1) score += 1.3;
  if (pclass == 2) score += 0.2;
  if (pclass == 3) score -= 0.7;
  if (age < 12) score += 0.7;
  if (age > 50) score += 0.2;
  // Sigmoid for probability
  const prob = 1 / (1 + Math.exp(-score));
  return Math.max(0, Math.min(1, prob));
}