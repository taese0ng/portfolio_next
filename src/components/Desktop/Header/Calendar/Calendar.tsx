import { Children, useEffect, useState } from "react";

import styles from "./Calendar.module.scss";
import classNames from "classnames";

const dayList = ["일", "월", "화", "수", "목", "금", "토"];
let mainDate = new Date();

export default function Calendar() {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [todate, setToday] = useState(0);
  const [toMonth, setToMonth] = useState(0);
  const [toYear, setToYear] = useState(0);
  const [dateList, setDateList] = useState<Array<Array<number>>>([]);
  const [selectedDate, setSelectedDate] = useState(0);

  const makeDayList = (startDate: number, lastDate: number) => {
    const tempArr: Array<Array<number>> = [];

    for (let i = startDate; i < lastDate; i = i + 7) {
      const tempRow: Array<number> = [];
      for (let j = 0; j < 7; j++) {
        const date = i + j;
        if (date <= lastDate) {
          tempRow.push(date);
        }
      }
      tempArr.push(tempRow);
    }

    return tempArr;
  };

  const init = () => {
    const tempMonth = mainDate.getMonth() + 1;
    setYear(mainDate.getFullYear());
    setMonth(tempMonth);

    mainDate.setDate(1);
    const startDay = mainDate.getDay();
    const startDate = mainDate.getDate() - startDay;

    mainDate.setMonth(tempMonth);
    mainDate.setDate(0);
    const lastDate = mainDate.getDate();

    setDateList(makeDayList(startDate, lastDate));
  };

  const handleClickDate = (date: number) => {
    setSelectedDate(date);
  };

  const handlePrevCalendar = () => {
    const nowMonth = mainDate.getMonth();
    mainDate.setDate(1);
    mainDate.setMonth(nowMonth - 1);
    init();
  };

  const handleNowCalendar = () => {
    mainDate = new Date();
    init();
  };

  const handleNextCalendar = () => {
    const nowMonth = mainDate.getMonth();
    mainDate.setDate(1);
    mainDate.setMonth(nowMonth + 1);

    init();
  };

  const getTodayValue = (date: Date) => {
    setToMonth(date.getMonth() + 1);
    setToYear(date.getFullYear());
    setToday(date.getDate());
  };

  useEffect(() => {
    init();

    const date = new Date();
    getTodayValue(date);

    const interval = setInterval(() => {
      getTodayValue(date);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          {month}월 {year}
        </div>

        <div className={styles.controlWrapper}>
          <div className={styles.controlButton} onClick={handlePrevCalendar}>
            ◁
          </div>
          <div className={styles.controlButton} onClick={handleNowCalendar}>
            ○
          </div>
          <div className={styles.controlButton} onClick={handleNextCalendar}>
            ▷
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          {Children.toArray(
            dayList.map((day) => <span className={styles.item}>{day}</span>),
          )}
        </div>

        <div>
          {Children.toArray(
            dateList.map((dateRow) => (
              <div className={styles.row}>
                {Children.toArray(
                  dateRow.map((date) => (
                    <span
                      className={classNames("dateItem", {
                        [styles.uppedCursor]: date > 0,
                        [styles.today]:
                          todate === date &&
                          toMonth === month &&
                          toYear === year,
                        [styles.selected]: selectedDate === date && date > 0,
                      })}
                      onClick={() => handleClickDate(date)}
                    >
                      {date > 0 ? date : ""}
                    </span>
                  )),
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
