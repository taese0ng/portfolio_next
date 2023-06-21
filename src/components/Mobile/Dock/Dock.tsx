import { ResponsiveImage } from "@/components/shared";
import styled from "@emotion/styled";
import { itemList } from "@/constants/mobile/dock";
import { Children } from "react";

const safariIcon = "/assets/icons/safari.webp";

function Dock() {
  return (
    <Container>
      <Items>
        <Item>
          <ItemIcon href="https://www.google.co.kr" target="_blank">
            <ResponsiveImage src={safariIcon} alt="safari" />
          </ItemIcon>
        </Item>

        {Children.toArray(
          itemList.map((item) => (
            <Item>
              <ItemIcon href={`mobile/${item.id}`}>
                <ResponsiveImage src={item.icon} alt={item.id} />
              </ItemIcon>
            </Item>
          )),
        )}
      </Items>
    </Container>
  );
}

export default Dock;

const Container = styled.div`
  backdrop-filter: blur(15px);
  background-color: var(--white-40per);
  border-radius: 20px;
  padding: 15px;
  margin: 15px;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Item = styled.li`
  list-style: none;
  width: 15vw;
  max-width: 70px;
  height: 15vw;
  max-height: 70px;
`;

const ItemIcon = styled.a`
  border-radius: 10px;
  overflow: hidden;
`;
