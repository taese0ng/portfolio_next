import styled from "@emotion/styled";

interface Props {
  title: string;
  onPrev: () => void;
  onNow: () => void;
  onNext: () => void;
}
function CalendarHeader({ title, onPrev, onNext, onNow }: Props) {
  return (
    <Container>
      <Title>{title}</Title>

      <Wrapper>
        <ControlButton onClick={onPrev}>◁</ControlButton>
        <ControlButton onClick={onNow}>○</ControlButton>
        <ControlButton onClick={onNext}>▷</ControlButton>
      </Wrapper>
    </Container>
  );
}

export default CalendarHeader;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const Title = styled.div`
  margin: 3px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  font-size: 12px;

  &:hover {
    background-color: var(--white-20per);
  }
`;
