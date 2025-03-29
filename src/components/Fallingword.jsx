import { useState, useEffect } from "react";

export default function Word({ onWordMatch, onMissedWord, inputWord, clearInput, gameOver, fallingSpeed }) {
  const [wordList, setWordList] = useState([]);
  const [fallingWords, setFallingWords] = useState([]);

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch("https://random-word-api.vercel.app/api?words=200");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setWordList(data);
      } catch (error) {
        console.error("Error fetching words:", error);
        alert(`Words fetch nahi ho raha! 😭\nError: ${error.message}`);
      }
    };

    fetchWord();
  }, []);

  useEffect(() => {
    if (wordList.length === 0 || gameOver) return;

    const interval = setInterval(() => {
      setFallingWords((prevWords) => [
        ...prevWords,
        {
          text: wordList[Math.floor(Math.random() * wordList.length)], 
          top: 0, 
          left: Math.random() * 500, 
          missed: false, 
        },
      ]);
    }, 1700);

    return () => clearInterval(interval);
  }, [wordList, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    
    const moveInterval = setInterval(() => {
      setFallingWords((prevWords) => {
        return prevWords.map((word) => ({ ...word, top: word.top + fallingSpeed }))
          .filter((word) => {
            if (word.top >= 500 && !word.missed) {
              word.missed = true;
              onMissedWord();
              return false;
            }
            return true;
          });
      });
    }, 60);

    return () => clearInterval(moveInterval);
  }, [gameOver, fallingSpeed]);

  useEffect(() => {
    if (gameOver || !inputWord.trim()) return;

    setFallingWords((prevWords) => {
      const matchedIndex = prevWords.findIndex((word) => word.text.toLowerCase() === inputWord.trim().toLowerCase());
      if (matchedIndex !== -1) {
        onWordMatch();
        clearInput();
        return prevWords.filter((_, index) => index !== matchedIndex);
      }
      return prevWords;
    });
  }, [inputWord, onWordMatch, clearInput, gameOver]);

  return (
    <div className="relative w-[740px] h-[500px] bg-gray-900 overflow-hidden">
      {fallingWords.map((word, index) => (
        <div
          key={index}
          className="absolute text-white text-lg font-bold"
          style={{ top: `${word.top}px`, left: `${word.left}px` }}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
}
