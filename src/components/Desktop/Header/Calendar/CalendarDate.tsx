import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Children } from "react";

interface Props {
  dateList: Array<Array<number>>;
  selectedDate: number;
  todate: number;
  toMonth: number;
  month: number;
  toYear: number;
  year: number;
  onClickDate: (date: number) => void;
}

function CalendarDate({
  dateList,
  selectedDate,
  todate,
  toMonth,
  month,
  toYear,
  year,
  onClickDate,
}: Props) {
  return (
    <Container>
      {Children.toArray(
        dateList.map((dateRow) => (
          <Row>
            {Children.toArray(
              dateRow.map((date) => (
                <Item
                  isUppedCursor={date > 0}
                  isSelected={selectedDate === date && date > 0}
                  isToday={
                    todate === date && toMonth === month && toYear === year
                  }
                  onClick={() => onClickDate(date)}
                >
                  {date > 0 ? date : ""}
                </Item>
              )),
            )}
          </Row>
        )),
      )}
    </Container>
  );
}

export default CalendarDate;

const Container = styled.div``;

const Row = styled.div`
  display: flex;
`;

const Item = styled.span<{
  isUppedCursor: boolean;
  isToday: boolean;
  isSelected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
  font-size: 13px;
  width: 22px;
  height: 22px;

  ${({ isUppedCursor }) =>
    isUppedCursor &&
    css`
      cursor: pointer;
    `};

  ${({ isToday }) =>
    isToday &&
    css`
      border-radius: 5px;
      box-shadow: 0 0 0 1.5px var(--blue-20);
    `};

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-radius: 5px;
      box-shadow: 0 0 0 1.5px var(--white-70per);
    `};

  &:hover {
    border-radius: 5px;
    box-shadow: 0 0 0 1.5px var(--white-70per);
  }
`;
