import { ReactElement, useEffect, useRef, useState, Fragment } from "react";

import { DockItemType } from "@/interfaces/dock";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
  item: DockItemType;
  onCloseModal: (id: string) => void;
  onUpperModal: (id: string) => void;
  children: ReactElement;
}

function BaseModal({ item, onCloseModal, onUpperModal, children }: Props) {
  const {
    width,
    height,
    position,
    id,
    isFixed,
    resizeable,
    zIndex,
    isFull = false,
    isAbsoluteHeader = false,
    title,
  } = item;
  const [isResizeClicked, setIsResizeClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isIconHover, setIsIconHover] = useState(false);
  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topSetterRef = useRef<HTMLDivElement>(null);
  const bottomSetterRef = useRef<HTMLDivElement>(null);
  const rightSetterRef = useRef<HTMLDivElement>(null);
  const leftSetterRef = useRef<HTMLDivElement>(null);
  const resizeObj = useRef({
    dir: "",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: 0,
    width: 0,
  });
  const containerMinWidth = (width || 0) - 100;
  const containerMinHeight = (height || 0) - 100;

  const saveResizeObj = () => {
    if (containerRef.current) {
      resizeObj.current.width = parseFloat(containerRef.current.style.width);
      resizeObj.current.height = parseFloat(containerRef.current.style.height);
      resizeObj.current.top = parseFloat(containerRef.current.style.top);
      resizeObj.current.left = parseFloat(containerRef.current.style.left);

      sessionStorage.setItem(
        `${id}LocationCoords`,
        JSON.stringify(resizeObj.current),
      );
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (containerRef.current && !isFixed) {
      if (isClicked) {
        containerRef.current.style.left = `${e.pageX - shiftX}px`;
        containerRef.current.style.top = `${e.pageY - shiftY}px`;
      } else if (isResizeClicked) {
        const height = resizeObj.current.bottom - e.pageY;
        const width = resizeObj.current.right - e.pageX;

        switch (resizeObj.current.dir) {
          case "top":
            if (containerMinHeight < height) {
              containerRef.current.style.top = `${e.pageY}px`;
              containerRef.current.style.height = `${height}px`;
            }
            break;
          case "bottom":
            containerRef.current.style.height = `${
              e.pageY - resizeObj.current.top
            }px`;
            break;
          case "right":
            containerRef.current.style.width = `${
              e.pageX - resizeObj.current.left
            }px`;
            break;
          case "left":
            if (containerMinWidth < width) {
              containerRef.current.style.left = `${e.pageX}px`;
              containerRef.current.style.width = `${width}px`;
            }
            break;
          case "rb":
            containerRef.current.style.height = `${
              e.pageY - resizeObj.current.top
            }px`;
            containerRef.current.style.width = `${
              e.pageX - resizeObj.current.left
            }px`;
            break;
          case "lb":
            containerRef.current.style.height = `${
              e.pageY - resizeObj.current.top
            }px`;
            if (containerMinWidth < width) {
              containerRef.current.style.left = `${e.pageX}px`;
              containerRef.current.style.width = `${width}px`;
            }
            break;
          case "rt":
            containerRef.current.style.width = `${
              e.pageX - resizeObj.current.left
            }px`;
            if (containerMinHeight < height) {
              containerRef.current.style.top = `${e.pageY}px`;
              containerRef.current.style.height = `${height}px`;
            }
            break;
          case "lt":
            if (containerMinHeight < height) {
              containerRef.current.style.top = `${e.pageY}px`;
              containerRef.current.style.height = `${height}px`;
            }
            if (containerMinWidth < width) {
              containerRef.current.style.left = `${e.pageX}px`;
              containerRef.current.style.width = `${width}px`;
            }
            break;
          default:
            break;
        }
      }
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsClicked(true);
      setShiftX(e.clientX - containerRef.current.getBoundingClientRect().left);
      setShiftY(e.clientY - containerRef.current.getBoundingClientRect().top);
    }
  };

  const onMouseUp = () => {
    setIsClicked(false);
    setIsResizeClicked(false);
    saveResizeObj();
  };

  const onResizeMouseDown = (dir: string) => {
    setIsResizeClicked(true);
    const bottomSetter = bottomSetterRef.current;
    const topSetter = topSetterRef.current;
    const leftSetter = leftSetterRef.current;
    const rightSetter = rightSetterRef.current;

    if (bottomSetter && topSetter && leftSetter && rightSetter) {
      switch (dir) {
        case "top":
          resizeObj.current.dir = "top";
          resizeObj.current.bottom = bottomSetter.getBoundingClientRect().top;
          break;
        case "bottom":
          resizeObj.current.dir = "bottom";
          resizeObj.current.top = topSetter.getBoundingClientRect().top;
          break;
        case "right":
          resizeObj.current.dir = "right";
          resizeObj.current.left = leftSetter.getBoundingClientRect().left;
          break;
        case "left":
          resizeObj.current.dir = "left";
          resizeObj.current.right = rightSetter.getBoundingClientRect().right;
          break;
        case "rb":
          resizeObj.current.dir = "rb";
          resizeObj.current.left = leftSetter.getBoundingClientRect().left;
          resizeObj.current.top = topSetter.getBoundingClientRect().top;
          break;
        case "lb":
          resizeObj.current.dir = "lb";
          resizeObj.current.right = rightSetter.getBoundingClientRect().right;
          resizeObj.current.top = topSetter.getBoundingClientRect().top;
          break;
        case "rt":
          resizeObj.current.dir = "rt";
          resizeObj.current.left = leftSetter.getBoundingClientRect().left;
          resizeObj.current.bottom = bottomSetter.getBoundingClientRect().top;
          break;
        case "lt":
          resizeObj.current.dir = "lt";
          resizeObj.current.right = rightSetter.getBoundingClientRect().right;
          resizeObj.current.bottom = bottomSetter.getBoundingClientRect().top;
          break;
        default:
          break;
      }
    }
  };

  const handleCloseModal = () => {
    onCloseModal(id);
  };

  const handleUppderModal = () => {
    onUpperModal(id);
  };

  const handleMouseEnter = () => {
    setIsIconHover(true);
  };

  const handleMouseLeave = () => {
    setIsIconHover(false);
  };

  useEffect(() => {
    const itemLocationCoords = sessionStorage.getItem(`${id}LocationCoords`);

    if (containerRef.current) {
      if (itemLocationCoords && !isFixed) {
        resizeObj.current = JSON.parse(itemLocationCoords);
        containerRef.current.style.top = `${resizeObj.current.top}px`;
        containerRef.current.style.left = `${resizeObj.current.left}px`;
        if (resizeable) {
          containerRef.current.style.width = `${resizeObj.current.width}px`;
          containerRef.current.style.height = `${resizeObj.current.height}px`;
        }
      }
      containerRef.current.style.minWidth = `${containerMinWidth}px`;
      containerRef.current.style.minHeight = `${containerMinHeight}px`;
    }
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isClicked, isResizeClicked]);

  return (
    <Container
      isFull={isFull}
      ref={containerRef}
      onMouseDown={handleUppderModal}
      style={{
        width: width || 500,
        height: height || 300,
        zIndex: zIndex,
        left: position ? position.x : `calc(50% - ${width}px / 2)`,
        top: position ? position.y : "20%",
      }}
    >
      {resizeable && (
        <Fragment>
          <TopSetter
            ref={topSetterRef}
            onMouseDown={() => onResizeMouseDown("top")}
            onMouseUp={onMouseUp}
          />
          <BottomSetter
            ref={bottomSetterRef}
            onMouseDown={() => onResizeMouseDown("bottom")}
            onMouseUp={onMouseUp}
          />
          <RightSetter
            ref={rightSetterRef}
            onMouseDown={() => onResizeMouseDown("right")}
            onMouseUp={onMouseUp}
          />
          <LeftSetter
            ref={leftSetterRef}
            onMouseDown={() => onResizeMouseDown("left")}
            onMouseUp={onMouseUp}
          />
          <RbSetter
            onMouseDown={() => onResizeMouseDown("rb")}
            onMouseUp={onMouseUp}
          />
          <LbSetter
            onMouseDown={() => onResizeMouseDown("lb")}
            onMouseUp={onMouseUp}
          />
          <RtSetter
            onMouseDown={() => onResizeMouseDown("rt")}
            onMouseUp={onMouseUp}
          />
          <LtSetter
            onMouseDown={() => onResizeMouseDown("lt")}
            onMouseUp={onMouseUp}
          />
        </Fragment>
      )}

      <Header
        isAbsoluteHeader={isAbsoluteHeader}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Circle
          onClick={handleCloseModal}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CircleIcon isHover={isIconHover}>ⅹ</CircleIcon>
        </Circle>
        {!isAbsoluteHeader && title}
      </Header>

      <Body>{children}</Body>
    </Container>
  );
}

export default BaseModal;

const Container = styled.div<{ isFull: boolean }>`
  position: absolute;

  border-radius: 8px;
  overflow: hidden;

  border: 1px solid var(--gray-50);

  ${({ isFull }) =>
    isFull &&
    css`
      width: 100%;
      height: calc(100% - 105px);
      left: 0px;
      top: 25px;
    `};
`;

const Header = styled.div<{ isAbsoluteHeader: boolean }>`
  width: 100%;
  height: 30px;
  background-color: var(--gray-10);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--gray-50);
  -webkit-touch-callout: none;
  user-select: none;

  ${({ isAbsoluteHeader }) =>
    isAbsoluteHeader &&
    css`
      z-index: var(--absoluteHeader);
      position: absolute;
      top: 0;
      background-color: var(--transparent);
      border: none;
    `};
`;

const Body = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  border-radius: inherit;
`;

const Circle = styled.div`
  border-radius: 100%;
  width: 13px;
  height: 13px;
  display: flex;
  justify-content: center;
  background-color: var(--red-10);
  cursor: pointer;
  position: absolute;
  left: 15px;
`;

const CircleIcon = styled.div<{ isHover: boolean }>`
  position: relative;
  display: none;
  top: 50%;
  font-size: 10px;
  transform: translateY(-50%);

  ${({ isHover }) =>
    isHover &&
    css`
      display: unset;
    `};
`;

const Setter = styled.div`
  position: absolute;
  z-index: calc(var(--absoluteHeader) + 1);
  background-color: transparent;
`;

const TopSetter = styled(Setter)`
  top: 0;
  width: 100%;
  height: 4px;
  cursor: n-resize;
`;

const BottomSetter = styled(Setter)`
  bottom: 0;
  width: 100%;
  height: 4px;
  cursor: s-resize;
`;

const RightSetter = styled(Setter)`
  right: 0;
  width: 4px;
  height: 100%;
  cursor: e-resize;
`;

const LeftSetter = styled(Setter)`
  left: 0;
  width: 4px;
  height: 100%;
  cursor: w-resize;
`;

const RbSetter = styled(Setter)`
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  cursor: se-resize;
`;

const LbSetter = styled(Setter)`
  left: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  cursor: sw-resize;
`;

const RtSetter = styled(Setter)`
  right: 0;
  top: 0;
  width: 10px;
  height: 10px;
  cursor: ne-resize;
`;

const LtSetter = styled(Setter)`
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  cursor: nw-resize;
`;
