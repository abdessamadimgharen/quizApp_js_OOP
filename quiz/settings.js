import Quiz from "./quiz.js";
class Settings {
  constructor() {
    this.settingDom = document.querySelector(".settings");
    this.quizDom = document.querySelector(".quiz");
    this.categoryDom = document.querySelector("#category");
    this.nQuestionDom = document.querySelector("#nQuestions");
    this.startBtn = document.querySelector("#startBtn");
    this.difficulty = [
      document.querySelector("#easy"),
      document.querySelector("#medium"),
      document.querySelector("#hard"),
    ];
    this.quiz = {};
    this.startBtn.addEventListener("click", this.startQuizApp);
  }
  startQuizApp = async () => {
    try {
      let amount = this.getAmount();
      let categoryID = this.categoryDom.value;
      let difficulty = this.getDifficulty();

      let url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryID}&difficulty=${difficulty}`;
      let { results } = await this.fetchData(url);
      this.quiz = new Quiz(this.quizDom, amount, results);
      this.toggleElement();
    } catch (err) {
      // alert(err);
      console.log(err);
    }
  };
  toggleElement = () => {
    this.quizDom.style.display = "block";
    this.settingDom.style.display = "none";
  };
  getDifficulty = () => {
    let difficulty = this.difficulty.filter((el) => el.checked);
    if (difficulty.length === 1) {
      return difficulty[0].id;
    } else {
      alert("Please select difficulty");
    }
  };
  fetchData = async (url) => {
    let response = await fetch(url);
    let result = await response.json();
    return result;
  };
  getAmount = () => {
    let amount = this.nQuestionDom.value;
    if (amount > 0 && amount < 20) {
      return amount;
    } else {
      alert("Please enter a valid amount");
    }
  };
}

export default Settings;
