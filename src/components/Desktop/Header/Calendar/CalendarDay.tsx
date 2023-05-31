import styled from "@emotion/styled";
import { Children } from "react";

const dayList = ["일", "월", "화", "수", "목", "금", "토"];

function CalendarDay() {
  return (
    <Container>
      {Children.toArray(dayList.map((day) => <Item>{day}</Item>))}
    </Container>
  );
}

export default CalendarDay;

const Container = styled.div`
  display: flex;
`;

const Item = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
  font-size: 13px;
  width: 22px;
  height: 22px;
`;
