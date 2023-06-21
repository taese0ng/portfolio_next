import styled from "@emotion/styled";
import Time from "./Time";
import { Battery } from "@/components/shared";

function Header() {
  return (
    <Container>
      <Time />
      <Battery onPercent={true} />
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  background-color: var(--white-30per);
  backdrop-filter: blur(4px);
  padding: 0 10px;
`;
