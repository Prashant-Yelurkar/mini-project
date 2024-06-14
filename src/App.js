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
  const [isWon, setIsWon] = useState(false);
  const [islost, setIsLost] = useState(false);
  const [player, setPlayer] = useState("");
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
    setIsLost(false);
    setIsWon(false);
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
      if (time > 0 && !isWon) {
        const timer = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      } else {
        isCompleted();
      }
    }
  }, [time, gameStart]);

  const isCompleted = () => {
    if (
      checkedList.length < gameDataSet.length / 2 &&
      gameDataSet.length != 0
    ) {
      setIsLost(true);
    }
  };

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

  useEffect(() => {
    if (
      checkedList.length == gameDataSet.length / 2 &&
      gameDataSet.length != 0
    ) {
      setIsWon(true);
    }
  }, [checkedList]);

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
          <>
            <div className={styles.gridOuter}>
              <div className={styles.grid}>
                {gameDataSet.map((value, index) => {
                  return (
                    <ObjectCard
                      id={index}
                      isinTime={time}
                      clicked={{ first: firstChecked, second: secondChecked }}
                      checkedList={checkedList}
                      key={index}
                      {...value}
                      onChecked={(id) => handelCheck(id)}
                    />
                  );
                })}
              </div>
            </div>
            {isWon && (
              <div className={styles.celebrate}>
                🎉🎉Congratulations! {player} You won game in {count} turns
              </div>
            )}
            {islost && (
              <div className={styles.celebrate}>
                🎉🎉AYO! {player} You are LOSER! You Lost by
                {gameDataSet.length / 2 - checkedList.length} cards😂😂
              </div>
            )}
            <button className={styles.resetBtn} onClick={newGame}>
              {timer == 0 ? " Reset Game" : "New Game"}
            </button>
          </>
        ) : (
          <div className={styles.inputData}>
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setPlayer(e.target.value)}
            />
            <button onClick={() => setGameStart(!gameStart)}>Start Game</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
