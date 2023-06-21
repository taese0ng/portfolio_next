import styled from "@emotion/styled";
import { ReactNode } from "react";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  );
}

export default Layout;
const headerHeight = 30;

const Container = styled.div``;

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${headerHeight}px;
  z-index: var(--top);
`;

const ChildrenWrapper = styled.div`
  > :first-of-type {
    padding-top: ${headerHeight}px;
    height: calc(100vh - ${headerHeight}px);
  }
`;
