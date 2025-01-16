import { CorrectSvg, InCorrectSvg, MoonSvg, SunSvg } from "./Svg";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.darkMode === "on" ? true : false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [endGame, setEndGame] = useState(false);
  const [userScore, setUserScore] = useState(null);
  useEffect(() => {
    async function getData() {
      const { quizzes } = await fetch("/data/data.json").then((x) => x.json());
      setQuizData(quizzes);
    }
    getData();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.darkMode = "on";
    } else {
      document.body.removeAttribute("class");
      localStorage.darkMode = "off";
    }
  }, [darkMode]);

  function handleEndQuiz(userQuizResult) {
    setUserScore(userQuizResult);
    setEndGame(true);
  }

  function handleRestartGame() {
    setSelectedQuiz(null);
    setEndGame(false);
    setUserScore(null);
  }

  return (
    <div className="container">
      <header>
        <div className="quiz-type">
          {selectedQuiz && (
            <>
              <img src={selectedQuiz.icon} />
              <h2>{selectedQuiz.title}</h2>
            </>
          )}
        </div>
        <label>
          <SunSvg />
          <input className="switch" type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <MoonSvg />
        </label>
      </header>
      {!endGame ? selectedQuiz ? <QuizScreen quizData={selectedQuiz} handleEndQuiz={handleEndQuiz} /> : <WelcomeScreen setSelectedQuiz={setSelectedQuiz} quizData={quizData} /> : <ResultScreen userScore={userScore} selectedQuiz={selectedQuiz} handleRestartGame={handleRestartGame} />}
    </div>
  );
}

function WelcomeScreen({ setSelectedQuiz, quizData }) {
  function handleSelectQuiz(quizTitle) {
    setSelectedQuiz(quizData.find((x) => x.title === quizTitle));
  }

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
        <button onClick={() => handleSelectQuiz("HTML")}>
          <img src="./svg/html.svg" alt="" />
          <span>HTML</span>
        </button>
        <button onClick={() => handleSelectQuiz("CSS")}>
          <img src="./svg/css.svg" alt="" />
          <span>CSS</span>
        </button>
        <button onClick={() => handleSelectQuiz("JavaScript")}>
          <img src="./svg/js.svg" alt="" />
          <span>JavaScript</span>
        </button>
        <button onClick={() => handleSelectQuiz("Erişilebilirlik")}>
          <img src="./svg/accessibility.svg" alt="" />
          <span>Erişilebilirlik</span>
        </button>
      </div>
    </div>
  );
}

function QuizScreen({ quizData, handleEndQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userScore, setUserScore] = useState({
    correct: 0,
    incorrect: 0,
  });

  const currentQuestion = quizData.questions[currentQuestionIndex];

  function submitAnswer() {
    if (selectedAnswer.trim() === "") {
      setShowWarning(true);
      return;
    }

    if (currentQuestion.answer === selectedAnswer) {
      userScore.correct++;
    } else {
      userScore.incorrect++;
    }

    setUserScore(userScore);
    setShowWarning(false);
    setShowAnswer(true);
  }

  function nextQuestion() {
    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setShowAnswer(false);
      setSelectedAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    handleEndQuiz(userScore);
  }

  return (
    <div className="quiz-contents">
      <div className="quiz-header">
        <p>
          {quizData.questions.length} sorundan {currentQuestionIndex + 1}.
        </p>
        <h3>{currentQuestion.question}</h3>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-status" style={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }}></div>
      </div>
      <div className="quiz-options">
        {currentQuestion.options.map((x) => (
          <label className={"quiz-option" + (showAnswer ? (currentQuestion.answer === x ? " correct" : selectedAnswer === x ? " incorrect" : "") : "")} key={x}>
            <input type="radio" name="answer" disabled={showAnswer} onChange={() => setSelectedAnswer(x)} />
            <span>{x}</span>
            {showAnswer && (currentQuestion.answer === x ? <CorrectSvg fillColor="#26D782" /> : selectedAnswer === x && <InCorrectSvg fillColor="#EE5454" />)}
          </label>
        ))}
        {showAnswer ? (
          <button className="purple-btn" onClick={nextQuestion}>
            {currentQuestionIndex + 1 < quizData.questions.length ? "Sıradaki Soru" : "Sınavı Bitir"}
          </button>
        ) : (
          <button className="purple-btn" onClick={submitAnswer}>
            Cevabı Onayla
          </button>
        )}
        {showWarning && (
          <p className="warning-msg">
            <InCorrectSvg fillColor="#EE5454" />
            Lütfen bir cevap seçin
          </p>
        )}
      </div>
    </div>
  );
}

function ResultScreen({ userScore, selectedQuiz, handleRestartGame }) {
  return (
    <div className="result-contents">
      <div className="result-header">
        <h3>
          <span>Sınav tamamlandı </span>
          İşte skorun...
        </h3>
      </div>
      <div className="result-data">
        <div className="result-info">
          <div className="quiz-type">
            <img src={selectedQuiz.icon} />
            <h2>{selectedQuiz.title}</h2>
          </div>
          <h3>{userScore.correct}</h3>
          <p>{selectedQuiz.questions.length} soruda</p>
        </div>
        <button className="purple-btn" onClick={handleRestartGame}>
          Tekrar Oyna
        </button>
      </div>
    </div>
  );
}

export default App;
