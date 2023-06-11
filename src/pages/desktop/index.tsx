import { Dock, Header, AnimatedBaseModal } from "@/components/Desktop";
import { useRecoilState } from "recoil";
import { bgImgAtom } from "@/store";
import { Children, useEffect, useState } from "react";
import { DockItemType } from "@/interfaces/dock";
import { itemList } from "@/constants/dock";
import { ResponsiveImage } from "@/components/shared";
import styled from "@emotion/styled";

const defaultBackgroundImage = "/assets/backgrounds/background_monterey.webp";

export default function Desktop() {
  const [bgImg, setBgImg] = useRecoilState(bgImgAtom);
  const [items, setItems] = useState(itemList);

  const handleOpenModal = (id: string, nowOpen = false) => {
    const tempItems = items.map((item) => item);
    const index = tempItems.findIndex((item: DockItemType) => item.id === id);
    const zIndexs = tempItems.map((item: DockItemType) => item.zIndex);

    tempItems[index].zIndex = Math.max(...zIndexs) + 1;
    tempItems[index].isOpen = true;
    tempItems[index].nowOpen = nowOpen;

    setItems(tempItems);
  };

  const handleCloseModal = (id: string) => {
    const tempItems = items.map((item) => item);
    const index = tempItems.findIndex((item: DockItemType) => item.id === id);

    setTimeout(() => {
      tempItems[index].zIndex = 0;
      tempItems[index].isOpen = false;
      setItems(tempItems);
    }, 200);
  };

  const handleUpperModal = (id: string) => {
    const tempItems = items.map((item) => item);
    const index = tempItems.findIndex((item: DockItemType) => item.id === id);
    const zIndexs = tempItems.map((item: DockItemType) => item.zIndex);
    const maxIndex = Math.max(...zIndexs);

    if (tempItems[index].zIndex < maxIndex) {
      tempItems[index].zIndex = maxIndex + 1;
      setItems(tempItems);
    }
  };

  useEffect(() => {
    const settedBg = localStorage.getItem("background");

    if (settedBg) {
      setBgImg(JSON.parse(settedBg));
    } else {
      setBgImg({
        src: defaultBackgroundImage,
        title: "Monterey(Graphic)",
      });
    }
  }, []);

  return (
    <Container>
      <Header
        itemList={items}
        onOpenModal={handleOpenModal}
        onUpperModal={handleUpperModal}
      />
      {bgImg.src && <BackgroundImage src={bgImg.src} alt="background" />}

      {Children.toArray(
        items.map(
          (item) =>
            item.isOpen && (
              <AnimatedBaseModal
                item={item}
                onCloseModal={handleCloseModal}
                onUpperModal={handleUpperModal}
              >
                <item.component />
              </AnimatedBaseModal>
            ),
        ),
      )}

      <Dock
        itemList={items}
        onOpenModal={handleOpenModal}
        onUpperModal={handleUpperModal}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const BackgroundImage = styled(ResponsiveImage)`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: var(--background);
  -webkit-touch-callout: none;
  user-select: none;
`;
