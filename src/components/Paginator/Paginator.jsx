import React, { useEffect, useState } from "react";
import styles from "./Paginator.module.css";
import arrow from "../../assets/img/arrow.svg";

const Paginator = (props) => {
  const {
    totalCount,
    pageSize,
    onPageChanged,
    currentPage,
    positionSize = 10,
  } = props;

  let pageCount = Math.ceil(totalCount / pageSize);

  const pages = Array.from(Array(pageCount).keys());

  let portionCount = Math.ceil(pageCount / positionSize);
  let [positionNumber, setPositionNumber] = useState(1);
  let leftPositionNumberPage = positionNumber;
  let rightPositionNumberPage = positionNumber + 9;

  return (
    <div className={styles.container}>
      {positionNumber !== 1 ? (
        <div
          className={styles.arrowLeft}
          onClick={() => {
            setPositionNumber(positionNumber - 1);
          }}
        >
          <img alt="arrow" className={styles.arrowImg} src={arrow} />
        </div>
      ) : null}

      {pages
        .filter(
          (p) => p >= leftPositionNumberPage && p <= rightPositionNumberPage
        )
        .map((p, index) => {
          return (
            <span
              key={index}
              className={currentPage === p ? styles.selectedActive : null}
              onClick={() => onPageChanged(p)}
            >
              {p}
            </span>
          );
        })}

      {portionCount !== positionNumber ? (
        <div
          className={styles.arrowRight}
          onClick={() => {
            setPositionNumber(positionNumber + 1);
          }}
        >
          <img alt="arrow" className={styles.arrowImg} src={arrow} />
        </div>
      ) : null}
    </div>
  );
};

export default Paginator;
