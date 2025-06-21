# Will You Survive Titanic? 🚢

A fun, interactive web playground that predicts your chances of surviving the Titanic disaster using a classic machine learning model!  
No installations required — runs entirely in your browser and hosted via GitHub Pages.

---

## 🌟 Features

- **Web-based**: No need to install anything. Just open the site in your browser.
- **Instant Predictions**: Enter your details (age, sex, class, etc.) and see your chances of survival.
- **Powered by Machine Learning**: Uses a pre-trained model (based on the famous Titanic dataset) running fully client-side.
- **100% Free & Open Source**: All code lives in this repository.
- **Traffic Control**: Simple rate-limiting to ensure fair usage.

---

## 🚀 Getting Started

1. **Visit the App:**  
   [https://YOUR_GITHUB_USERNAME.github.io/titanic-survival-playground/](https://YOUR_GITHUB_USERNAME.github.io/titanic-survival-playground/)

2. **Try It Out:**  
   - Fill in the form (age, sex, class, etc.)
   - Click "Predict" to see your result.

---

## 🛠️ How It Works

- The web app uses a simple logistic regression model (classic Titanic ML demo) implemented in JavaScript.
- All processing is done in your browser — no backend or server required!
- Rate limiting prevents spamming predictions.

---

## 🏗️ Project Structure

```
public/
  └── index.html       # Main web page
src/
  ├── app.js           # UI and logic
  └── model.js         # ML model logic
styles/
  └── style.css        # Styling
.github/
  └── workflows/
      └── deploy.yml   # GitHub Actions for Pages deployment
README.md
```

---

## 🧑‍💻 Development

You can edit everything directly in GitHub’s web VS Code!

1. Clone or open this repo in GitHub.
2. Edit files in the `src/`, `public/`, or `styles/` directories.
3. Push your changes — GitHub Pages will auto-deploy your site.

---

## 🐳 Deployment

GitHub Pages is set up via the repository Settings or with a deploy workflow (`.github/workflows/deploy.yml`).  
Your site will be live at:  
`https://YOUR_GITHUB_USERNAME.github.io/titanic-survival-playground/`

---

## ⚠️ Traffic Control

- The app restricts repeated predictions using local browser storage.
- For demo use only. Please don’t abuse the playground.

---

## 🤝 Contributing

Pull requests and suggestions are welcome!  
Feel free to fork the repo or open an issue.

---

## 📚 References

- [Kaggle: Titanic - Machine Learning from Disaster](https://www.kaggle.com/c/titanic)
- [TensorFlow.js](https://www.tensorflow.org/js/)
- [GitHub Pages Documentation](https://pages.github.com/)

---

**Made with ❤️ using open-source tools and data.**
