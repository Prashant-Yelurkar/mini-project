import React, { useEffect, useState } from "react";
import { Img } from "react-image";
import styles from "./objcard.module.css";
const ObjectCard = (props) => {
  const { data, onChecked, checkedList, id, clicked, icon, isinTime } = props;
  const [isChecked, setIsChecked] = useState(false);
  const handelFlip = () => {
    if (!checkedList.includes(data) && isinTime != 0) {
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
          <Img src={icon} alt="data" />
        </div>
      </div>
    </div>
  );
};

export default ObjectCard;
