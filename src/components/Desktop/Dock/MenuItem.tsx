import { MouseEvent, useState } from "react";

import { DockItemType } from "@/interfaces/dock";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveImage } from "@/components/shared";
import styled from "@emotion/styled";

interface Props {
  item: DockItemType;
  onOpenModal: (id: string) => void;
  onUpperModal: (id: string) => void;
}

function MenuItem({ item, onOpenModal, onUpperModal }: Props) {
  const { title, isOpen, icon } = item;
  const [isHover, setIsHover] = useState(false);
  const [isBounce, setIsBounce] = useState(false);

  const onClickMenu = (
    e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement },
    dockItem: DockItemType,
  ) => {
    e.preventDefault();
    if (!dockItem.isOpen) {
      setIsBounce(true);
      setTimeout(() => setIsBounce(false), 300);

      onOpenModal(dockItem.id);
    } else {
      onUpperModal(dockItem.id);
    }
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Container>
      <Wrapper
        initial={{ top: 0 }}
        animate={{ top: isBounce ? -20 : 0 }}
        transition={{ duration: 0.3, ease: "linear" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence>
          {isHover && (
            <MenuItemTitle
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {title}
            </MenuItemTitle>
          )}
        </AnimatePresence>
        <MenuItemIcon onClick={(e) => onClickMenu(e, item)}>
          <ResponsiveImage src={icon} alt={title} />
        </MenuItemIcon>
      </Wrapper>
      {isOpen && <Dot />}
    </Container>
  );
}

export default MenuItem;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItemTitle = styled(motion.div)`
  display: block;
  position: absolute;
  top: -40px;
  min-width: 60px;
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

const Dot = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background: var(--darkBlue-10);
  bottom: -10px;
`;

const MenuItemIcon = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0 6px;
  cursor: pointer;
  background-color: transparent;
  background-size: 100%;
  overflow: hidden;
`;
