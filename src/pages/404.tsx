import Link from "next/link";
import styled from "@emotion/styled";

export default function Custom404() {
  return (
    <Container>
      <Title>잘못된 경로입니다.</Title>
      <LinkWrapper>
        <Link href={"/"}>Home</Link> 으로 이동하기
      </LinkWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 35%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: bold;
`;

const LinkWrapper = styled.div`
  font-size: 40px;
`;
