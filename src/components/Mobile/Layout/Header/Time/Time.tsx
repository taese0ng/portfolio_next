import styled from "@emotion/styled";
import { useEffect, useState } from "react";

function Time() {
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");

  const setTime = () => {
    const dateObj = new Date(),
      tempHour = dateObj.getHours() % 12 || 12,
      tempMin = dateObj.getMinutes();

    setHour(tempHour > 9 ? String(tempHour) : `0${tempHour}`);
    setMin(tempMin > 9 ? String(tempMin) : `0${tempMin}`);
  };

  useEffect(() => {
    setTime();
    const interval = setInterval(setTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      {hour}:{min}
    </Container>
  );
}

export default Time;

const Container = styled.div`
  font-size: 15px;
  font-weight: 600;
`;
