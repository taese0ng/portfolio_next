import styled from "@emotion/styled";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <Container>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  );
}

export default Layout;

const Container = styled.div``;

const ChildrenWrapper = styled.div`
  :first-of-type {
    padding: 30px 0;
  }
`;
