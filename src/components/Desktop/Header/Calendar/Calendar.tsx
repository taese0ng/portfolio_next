import { useEffect, useState } from "react";

import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";
import CalendarDate from "./CalendarDate";
import styled from "@emotion/styled";

let mainDate = new Date();

function Calendar() {
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
    <Container>
      <CalendarHeader
        title={`${month}월 ${year}`}
        onPrev={handlePrevCalendar}
        onNow={handleNowCalendar}
        onNext={handleNextCalendar}
      />

      <BodyWrapper>
        <CalendarDay />

        <CalendarDate
          dateList={dateList}
          selectedDate={selectedDate}
          todate={todate}
          toMonth={toMonth}
          toYear={toYear}
          month={month}
          year={year}
          onClickDate={handleClickDate}
        />
      </BodyWrapper>
    </Container>
  );
}

export default Calendar;

const Container = styled.div``;

const BodyWrapper = styled.div`
  margin: 10px 0;
`;
