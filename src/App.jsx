import { useState, useEffect } from "react";
import "./App.css";
import Word from "./components/Fallingword";

function App() {
  const [score, setScore] = useState(0);
  const [inputWord, setInputWord] = useState("");
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [missedWords, setMissedWords] = useState(0);

  const increaseScore = () => {
    setScore((prevScore) => prevScore + 10);
  };

  const decreaseLife = () => {
    setMissedWords((prevMissed) => prevMissed + 1);
  };

  useEffect(() => {
    if (missedWords > 0) {
      setLives((prevLives) => {
        if (prevLives <= 1) {
          setGameOver(true);
          return 0;
        }
        return prevLives - 1;
      });
      setMissedWords(0);
    }
  }, [missedWords]);

  const clearInput = () => {
    setInputWord("");
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setInputWord("");
    setMissedWords(0);
  };

  return (
    <>
      {/* Header Section */}
      <header className="w-full py-4 bg-gray-900 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 drop-shadow-lg uppercase tracking-wider animate-pulse">
          WORD FALL - TYPING GAME
        </h1>
      </header>

      {/*score wala  and restart wala screen */}
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black text-white">
        {gameOver ? (
          <div className="bg-red-700 text-white p-10 w-[500px] rounded-lg shadow-2xl text-center text-4xl font-extrabold animate-pulse">
            <p>Game Over!</p>
            <p className="text-2xl mt-3">Your Score: {score}</p>
            <button
              className="mt-6 px-8 py-4 bg-blue-600 hover:bg-blue-800 text-white rounded-lg text-lg font-bold transition duration-300 transform hover:scale-110"
              onClick={restartGame}
            >
              Restart Game
            </button>
          </div>
        ) : (
          <div className="w-[850px] space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex justify-between items-center border border-gray-600">
              <div className="text-yellow-400 text-3xl font-extrabold">Score: {score}</div>
              <div className="text-red-400 text-3xl font-extrabold">Lives: {'❤️'.repeat(lives)}</div>
            </div>
            {/* game wala screen */}
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center text-2xl font-bold relative h-[550px] border border-gray-700">
              <Word
                onWordMatch={increaseScore}
                onMissedWord={decreaseLife}
                inputWord={inputWord}
                clearInput={clearInput}
                gameOver={gameOver}
                fallingSpeed={3}
              />
            </div>
          {/* input wala field */}
            <div className="bg-white p-6 rounded-lg shadow-xl text-center border border-gray-300">
              <input
                type="text"
                className="p-4 text-black w-4/5 text-2xl border border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 shadow-md"
                placeholder="Type the falling word..."
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    clearInput();
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer  */}
      <footer className="w-full py-4 bg-gray-900 text-center text-white text-lg font-bold">
        Made by <span className="text-blue-400">SUMIT NAYAK</span>
      </footer>
    </>
  );
}

export default App;
