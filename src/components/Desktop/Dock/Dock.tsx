import { Children, useState } from "react";

import { DockItemType } from "@/interfaces/dock";
import { ResponsiveImage } from "@/components/shared";

import MenuItem from "./MenuItem";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";

const safariIcon = "/assets/icons/safari.webp";

interface Props {
  itemList: Array<DockItemType>;
  onOpenModal: (id: string) => void;
  onUpperModal: (id: string) => void;
}

function Dock({ itemList, onOpenModal, onUpperModal }: Props) {
  const [safariIsHover, setSafariIsHover] = useState(false);

  const handleClickSafari = () => {
    window.open("https://www.google.co.kr");
  };

  const handleMouseEnter = () => {
    setSafariIsHover(true);
  };

  const handleMouseLeave = () => {
    setSafariIsHover(false);
  };

  return (
    <Container id="dock">
      <Menu>
        <MenuItemWrapper
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {safariIsHover && (
              <MenuItemTitle
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                safari
              </MenuItemTitle>
            )}
          </AnimatePresence>

          <MenuItemIcon onClick={handleClickSafari}>
            <ResponsiveImage src={safariIcon} alt="safari" />
          </MenuItemIcon>
        </MenuItemWrapper>

        {Children.toArray(
          itemList.map((item) => (
            <MenuItem
              item={item}
              onOpenModal={onOpenModal}
              onUpperModal={onUpperModal}
            />
          )),
        )}
      </Menu>
    </Container>
  );
}

export default Dock;

const Container = styled.div`
  z-index: var(--top);
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`;

const Menu = styled.div`
  background: var(--white-70per);
  backdrop-filter: blur(20px);
  border: 1px solid var(--white-40per);
  display: flex;
  padding: 8px 5px 14px 5px;
  border-radius: 20px;
`;

const MenuItemWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItemTitle = styled(motion.div)`
  display: block;
  position: absolute;
  top: -40px;
  width: 60px;
  text-align: center;
  padding: 5px;
  background-color: var(--gray-50);
  border-radius: 8px;
  font-size: 13px;

  &::after {
    border-color: var(--gray-50) transparent;
    border-style: solid;
    border-width: 6px 8px 0 6px;
    content: "";
    display: block;
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    z-index: 1;
  }
`;

const MenuItemIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0 6px;
  cursor: pointer;
  background-color: transparent;
  background-size: 100%;
  overflow: hidden;
`;
