import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Children } from "react";

interface Props {
  width: number;
  years: number[];
  selectedYear: number;
  onClickYear: (year: number) => void;
  onMouseDown: () => void;
}

function SideBar({
  width,
  years,
  selectedYear,
  onClickYear,
  onMouseDown,
}: Props) {
  return (
    <Container>
      <Wrapper width={width}>
        <Category>연도</Category>
        <ul>
          {Children.toArray(
            years.map((year) => (
              <Item
                isFocused={selectedYear === year}
                onClick={() => onClickYear(year)}
              >
                {year}년
              </Item>
            )),
          )}
        </ul>
      </Wrapper>

      <WidthSetter onMouseDown={onMouseDown} />
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  position: relative;
  padding: 30px 10px 0 10px;

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--white-70per);
    backdrop-filter: blur(15px);
  }
`;

const Wrapper = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
`;

const Category = styled.div`
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  color: var(--gray-90);
  margin: 5px 0;
`;

const Item = styled.li<{ isFocused: boolean }>`
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
  margin: 2px 0;

  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: var(--gray-20per);
      font-weight: 600;
    `};

  &:hover {
    background-color: var(--gray-20per);
  }
`;

const WidthSetter = styled.span`
  position: absolute;
  right: -5px;
  top: 0;
  height: 100%;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: e-resize;
`;
