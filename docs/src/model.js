// --- Individual model functions ---
// Logistic Regression coefficients (dummy example, for demo)
function model_logreg(passenger) {
  const w = {
    intercept: -1.2,
    pclass: -0.52,
    sex: -2.4,
    age: -0.025,
    sibsp: -0.38,
    parch: -0.14,
    fare: 0.0023,
    embarkedC: 0.2,
    embarkedQ: -0.11,
    embarkedS: 0.0
  };
  let x =
    w.intercept +
    w.pclass * passenger.pclass +
    w.sex * (passenger.sex === "male" ? 1 : 0) +
    w.age * passenger.age +
    w.sibsp * passenger.sibsp +
    w.parch * passenger.parch +
    w.fare * passenger.fare +
    (passenger.embarked === "C" ? w.embarkedC : 0) +
    (passenger.embarked === "Q" ? w.embarkedQ : 0) +
    (passenger.embarked === "S" ? w.embarkedS : 0);
  return 1 / (1 + Math.exp(-x));
}

// Random Forest (dummy decision rule for demo)
function model_rf(passenger) {
  let votes = 0;
  if (passenger.sex === "female") votes++;
  if (passenger.pclass === 1) votes++;
  if (passenger.age < 14) votes++;
  if (passenger.fare > 70) votes++;
  if (passenger.sibsp === 0 && passenger.parch === 0) votes++;
  if (passenger.embarked === "C") votes++;
  return votes / 6;
}

// SVM (dummy linear kernel for demo)
function model_svm(passenger) {
  const w = {
    intercept: -0.7,
    pclass: -0.2,
    sex: -1.4,
    age: -0.02,
    sibsp: -0.12,
    parch: -0.08,
    fare: 0.0012,
    embarkedC: 0.1,
    embarkedQ: -0.05,
    embarkedS: 0.0
  };
  let x =
    w.intercept +
    w.pclass * passenger.pclass +
    w.sex * (passenger.sex === "male" ? 1 : 0) +
    w.age * passenger.age +
    w.sibsp * passenger.sibsp +
    w.parch * passenger.parch +
    w.fare * passenger.fare +
    (passenger.embarked === "C" ? w.embarkedC : 0) +
    (passenger.embarked === "Q" ? w.embarkedQ : 0) +
    (passenger.embarked === "S" ? w.embarkedS : 0);
  return Math.max(0, Math.min(1, 0.5 + 0.5 * Math.tanh(x)));
}

// KNN (dummy: closer to "lucky" survivor archetype returns higher, for demo)
function model_knn(passenger) {
  let dist =
    Math.abs(passenger.pclass - 1) * 1.2 +
    (passenger.sex === "male" ? 0.8 : 0) +
    Math.abs(passenger.age - 28) / 60 +
    Math.abs(passenger.fare - 50) / 50 +
    (passenger.embarked === "C" ? 0 : 0.2);
  return Math.max(0, 1 - dist / 4);
}

// Gradient Boosting (dummy: sum of weak learners)
function model_gb(passenger) {
  let s = 0;
  s += (passenger.sex === "female" ? 0.5 : -0.2);
  s += (passenger.pclass === 1 ? 0.15 : -0.1);
  s += (passenger.age < 16 ? 0.17 : -0.05);
  s += (passenger.fare > 80 ? 0.10 : -0.03);
  s += (passenger.embarked === "C" ? 0.07 : 0);
  s -= (passenger.sibsp > 2 ? 0.12 : 0);
  s -= (passenger.parch > 2 ? 0.06 : 0);
  return Math.max(0, Math.min(1, 0.5 + s));
}

// Neural Network (dummy: shallow, demo only)
function model_nn(passenger) {
  // Single hidden layer (demo)
  const input = [
    passenger.pclass / 3,
    passenger.sex === "male" ? 1 : 0,
    passenger.age / 80,
    passenger.sibsp / 8,
    passenger.parch / 6,
    passenger.fare / 100,
    passenger.embarked === "C" ? 1 : passenger.embarked === "Q" ? 0.5 : 0
  ];
  // weights and biases (random for demo)
  const w1 = [
    [0.7, -0.6, 0.2, 0.1, 0.15, 0.08, 0.2],
    [-0.3, 0.8, -0.1, 0.2, -0.18, 0.03, 0.1]
  ];
  const b1 = [0.1, -0.2];
  const h = [
    Math.tanh(input.reduce((s, x, i) => s + w1[0][i] * x, b1[0])),
    Math.tanh(input.reduce((s, x, i) => s + w1[1][i] * x, b1[1]))
  ];
  const w2 = [0.6, -0.4];
  const b2 = 0.05;
  let out = h[0] * w2[0] + h[1] * w2[1] + b2;
  out = 1 / (1 + Math.exp(-out));
  return Math.max(0, Math.min(1, out));
}

// Map of model functions
const MODELS = {
  logreg: model_logreg,
  rf: model_rf,
  svm: model_svm,
  knn: model_knn,
  gb: model_gb,
  nn: model_nn
};

// Main prediction function: uses selected model
function predictSurvival(passenger, modelKey) {
  const fn = MODELS[modelKey] || MODELS['logreg'];
  return fn(passenger);
}