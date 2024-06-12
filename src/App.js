import styles from "./Styles/app.module.css";
import ObjectCard from "./Components/Cards/ObjectCard";
import { NumberGame } from "./Utils/gameData";
import { useEffect, useState } from "react";

function App() {
  const [gameDataSet, setGameDataSet] = useState([]);
  const [firstChecked, setFirstChecked] = useState("");
  const [secondChecked, setSecondChecked] = useState("");
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const newGame = () => {
    setFirstChecked("");
    setSecondChecked("");
    setChecked(false);
    setCount(0);
    setTime(60);
    setScore(0);
    setTimeout(() => {
      setGameOver(true);
    }, 200);
    setCheckedList([]);
  };

  useEffect(() => {
    const Shuffle = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    const array = Shuffle([...NumberGame]);
    setGameOver(false);
    setGameDataSet(array);
  }, [gameOver]);

  useEffect(() => {
    if (gameStart) {
      if (time >= 0) {
        const timer = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [time, gameStart]);

  const handelCheck = (id) => {
    if (!checked && gameStart) {
      setCount(count + 1);
      if (firstChecked != "" && firstChecked != id) {
        setSecondChecked(id);
        setChecked(true);
      } else if (firstChecked == id) {
        setFirstChecked("");
      } else {
        console.log("First", id);
        setFirstChecked(id);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (secondChecked) {
        const firstCard = gameDataSet.filter((obj) => obj.id == firstChecked)[0]
          .data;
        const secondCard = gameDataSet.filter(
          (obj) => obj.id == secondChecked
        )[0].data;
        if (firstCard == secondCard) {
          setCheckedList([...checkedList, firstCard]);
          setScore(score + 1);
        }

        setFirstChecked("");
        setSecondChecked("");
        setChecked(false);
      }
    }, 500);
  }, [checked]);

  return (
    <div className={styles.main}>
      <div className={styles.gameArea}>
        <div className={styles.heading}>
          <h1>Memory Card Game</h1>
          {gameStart && (
            <>
              <p>Turns :{count} </p>
              <p>Time Left : {time}</p>
              <p>Score : {score}</p>
            </>
          )}
        </div>
        {gameStart ? (
          <div className={styles.gridOuter}>
            <div className={styles.grid}>
              {gameDataSet.map((value, index) => {
                return (
                  <ObjectCard
                    clicked={{ first: firstChecked, second: secondChecked }}
                    checkedList={checkedList}
                    key={index}
                    {...value}
                    onChecked={(id) => handelCheck(id)}
                  />
                );
              })}
            </div>
            <button onClick={newGame}>Reset Game</button>
          </div>
        ) : (
          <button onClick={() => setGameStart(!gameStart)}>Start Game</button>
        )}
      </div>
    </div>
  );
}

export default App;
