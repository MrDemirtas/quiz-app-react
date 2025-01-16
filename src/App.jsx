import { useState } from "react";

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="container">
      <header>
        <div className="quiz-type">
          <img src="./svg/js.svg" alt="JavaScript Logo" />
          <h2>JavaScript</h2>
        </div>
        <label>
          <input className="switch" type="checkbox" />
        </label>
      </header>
      <WelcomeScreen setSelectedQuiz={setSelectedQuiz} />
    </div>
  );
}

function WelcomeScreen({ setSelectedQuiz }) {
  return (
    <div className="welcome-contents">
      <div className="welcome-header">
        <h1>
          <span>Welcome to the </span>
          Frontend Quiz!
        </h1>
        <p>Pick a subject to get started.</p>
      </div>
      <div className="welcome-quiz-btns">
        <button onClick={() => setSelectedQuiz("HTML")}>
          <img src="./svg/html.svg" alt="" />
          <span>HTML</span>
        </button>
        <button onClick={() => setSelectedQuiz("CSS")}>
          <img src="./svg/css.svg" alt="" />
          <span>CSS</span>
        </button>
        <button onClick={() => setSelectedQuiz("JavaScript")}>
          <img src="./svg/js.svg" alt="" />
          <span>JavaScript</span>
        </button>
        <button onClick={() => setSelectedQuiz("Erişilebilirlik")}>
          <img src="./svg/accessibility.svg" alt="" />
          <span>Erişilebilirlik</span>
        </button>
      </div>
    </div>
  );
}

function QuizScreen() {
  return (
    <div className="quiz-contents">
      <div className="quiz-header">
        <p>Question 6 of 10</p>
        <h3>Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?</h3>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-status"></div>
      </div>
      <div className="quiz-options">
        <label>
          <input type="radio" name="answer" />
          4.5 : 1
        </label>
        <label>
          <input type="radio" name="answer" />
          4.5 : 1
        </label>
        <label>
          <input type="radio" name="answer" />
          4.5 : 1
        </label>
        <label>
          <input type="radio" name="answer" />
          4.5 : 1
        </label>
        <button className="purple-btn">Submit Answer</button>
      </div>
    </div>
  );
}

function ResultScreen() {
  return (
    <div className="result-contents">
      <div className="result-header">
        <h3>
          <span>Quiz completed </span>
          You scored...
        </h3>
      </div>
      <div className="result-data">
        <div className="result-info">
          <div className="quiz-type">
            <img src="./svg/js.svg" alt="" />
            <h2>JavaScript</h2>
          </div>
          <h3>8</h3>
          <p>out of 10</p>
        </div>
        <button className="purple-btn">Play Again</button>
      </div>
    </div>
  );
}

export default App;
