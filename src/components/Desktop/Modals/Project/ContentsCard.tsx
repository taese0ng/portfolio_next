import { Card } from "@/components/shared";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  isRow?: boolean;
}

function ContentsCard({ children, title, isRow = false }: Props) {
  return (
    <Container>
      <Card>
        <Wrapper isRow={isRow}>
          {title && <Title>{title}</Title>}

          {children}
        </Wrapper>
      </Card>
    </Container>
  );
}

export default ContentsCard;

const Container = styled.li``;

const Wrapper = styled.div<{ isRow: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: center;

  ${({ isRow }) =>
    isRow &&
    css`
      flex-direction: row !important;
    `}
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
`;
