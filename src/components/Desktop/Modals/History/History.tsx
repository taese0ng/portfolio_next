import { Children, useEffect, useRef, useState } from "react";

import { Card } from "@/components/shared";
import { historyList } from "@/constants/histories";

import { History as HistoryType } from "@/interfaces/histories";
import styles from "./History.module.scss";
import classNames from "classnames";

const clockIcon = "/assets/icons/clock.webp";
const years = historyList
  .filter(
    (history, idx, originList) =>
      idx ===
      originList.findIndex(
        (item) => item.from.getFullYear() === history.from.getFullYear(),
      ),
  )
  .map((history) => history.from.getFullYear());

function History() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyWrapperRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [sideBarWidth, setSideBarWidth] = useState(200);
  const [selectedHistory, setSelectedHistory] = useState<Array<HistoryType>>(
    [],
  );
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    localStorage.setItem("history_sidebar_width", JSON.stringify(sideBarWidth));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isClicked && containerRef.current && bodyWrapperRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const tempSideBarWidth = e.pageX - containerLeft;

      if (tempSideBarWidth <= 100) {
        setSideBarWidth(100);
      } else if (tempSideBarWidth < bodyWrapperRef.current.clientWidth / 2) {
        setSideBarWidth(tempSideBarWidth);
      }
    }
  };

  const getHistoryList = () => {
    const history = historyList.filter(
      (history) => history.from.getFullYear() === selectedYear,
    );

    setSelectedHistory(history);
  };

  const handleClickYear = (year: number) => {
    setSelectedYear(year);
  };

  const getDate = (history: HistoryType) => {
    const year = history.from.getFullYear();
    const month = history.from.getMonth() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}`;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isClicked]);

  useEffect(() => {
    getHistoryList();
  }, [selectedYear]);

  useEffect(() => {
    const localStorageWidth = localStorage.getItem("history_sidebar_width");
    const historySideBartWidth = localStorageWidth
      ? JSON.parse(localStorageWidth)
      : 200;

    setSideBarWidth(historySideBartWidth);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.sideBarWrapper}>
        <div style={{ width: sideBarWidth }}>
          <div className={styles.sideBarCategory}>연도</div>
          <ul>
            {Children.toArray(
              years.map((year) => (
                <li
                  className={classNames(styles.sideBarItem, {
                    [styles.isFocused]: selectedYear === year,
                  })}
                  onClick={() => handleClickYear(year)}
                >
                  {year}년
                </li>
              )),
            )}
          </ul>
        </div>

        <span className={styles.widthSetter} onMouseDown={handleMouseDown} />
      </div>

      <div className={styles.bodyWrapper} ref={bodyWrapperRef}>
        <div className={styles.header}>히스토리</div>
        <div className={styles.body}>
          <ul className={styles.histories}>
            {Children.toArray(
              selectedHistory.map((history) => (
                <li>
                  <Card>
                    <div>
                      <div className={styles.historyTitle}>{history.title}</div>
                      <div className={styles.historyDate}>
                        <img draggable={false} src={clockIcon} alt="clock" />
                        {getDate(history)}
                      </div>
                      <div className={styles.historyContent}>
                        {history.content}
                      </div>
                    </div>
                  </Card>
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default History;
