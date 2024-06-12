import React, { useEffect, useRef, useState } from "react";

import styles from "./objcard.module.css";
const ObjectCard = (props) => {
  const { data, onChecked, checkedList, id, clicked } = props;
  const [isChecked, setIsChecked] = useState(false);
  const handelFlip = () => {
    if (!checkedList.includes(data)) {
      onChecked(id);
    }
  };
  useEffect(() => {
    if (checkedList.includes(data)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkedList]);
  return (
    <div className={styles.flip_card} onClick={handelFlip}>
      <div
        className={`${styles.flip_card_inner} ${isChecked && styles.checked} ${
          (clicked.first == id || clicked.second == id) && styles.show
        }`}
      >
        <div className={styles.flip_card_front}></div>
        <div className={styles.flip_card_back}>
          <p>{data}</p>
        </div>
      </div>
    </div>
  );
};

export default ObjectCard;
