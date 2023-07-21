import { Children, useEffect, useRef, useState } from "react";

import { Card, ResponsiveImage } from "@/components/shared";
import { historyList } from "@/constants/shared/histories";

import { History as HistoryType } from "@/interfaces/histories";
import SideBar from "./SideBar";
import styled from "@emotion/styled";

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
    <Container ref={containerRef}>
      <SideBar
        width={sideBarWidth}
        years={years}
        selectedYear={selectedYear}
        onClickYear={handleClickYear}
        onMouseDown={handleMouseDown}
      />

      <BodyWrapper ref={bodyWrapperRef}>
        <Header>히스토리</Header>
        <Body>
          <Histories>
            {Children.toArray(
              selectedHistory.map((history) => (
                <li>
                  <Card>
                    <div>
                      <HistoryTitle>{history.title}</HistoryTitle>
                      <HistoryDate>
                        <HistoryDateIcon src={clockIcon} alt="clock" />
                        <div>{getDate(history)}</div>
                      </HistoryDate>
                      <HistoryContent>{history.content}</HistoryContent>
                    </div>
                  </Card>
                </li>
              )),
            )}
          </Histories>
        </Body>
      </BodyWrapper>
    </Container>
  );
}

export default History;

const Container = styled.div`
  display: flex;
  height: calc(100% + 30px);
`;

const BodyWrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  background-color: var(--gray-30);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  height: calc(100% - 30px);
  background-color: var(--gray-20);
`;

const Histories = styled.ul`
  height: calc(100% - 30px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
`;

const HistoryTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
`;

const HistoryDate = styled.div`
  color: var(--gray-70per);
  margin: 5px 0 10px 0;
  display: flex;
  align-items: center;
`;

const HistoryDateIcon = styled(ResponsiveImage)`
  width: 15px;
  height: 15px;
  margin-right: 4px;
`;

const HistoryContent = styled.div`
  background-color: var(--gray-10per);
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  word-break: keep-all;
  line-height: 25px;
`;
