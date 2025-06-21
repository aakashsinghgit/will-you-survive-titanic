// Fun demo model -- can be replaced with any logic
function predictSurvival({ pclass, sex, age }) {
  let score = -1.3;
  if (sex === "female") score += 2.4;
  if (pclass == 1) score += 1.2;
  if (pclass == 2) score += 0.2;
  if (pclass == 3) score -= 0.8;
  if (age < 13) score += 0.7;
  if (age > 55) score += 0.18;
  // Sigmoid
  const prob = 1 / (1 + Math.exp(-score));
  return Math.max(0, Math.min(1, prob));
}
