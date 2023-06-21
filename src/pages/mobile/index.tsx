import { Dock } from "@/components/Mobile";
import styled from "@emotion/styled";
import { mobileImgs } from "@/constants/shared/bgSetting";

const defaultBackgroundImage = mobileImgs[0];

export default function Mobile() {
  return (
    <Container>
      mobileHomes
      <Dock />
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${defaultBackgroundImage.src});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
