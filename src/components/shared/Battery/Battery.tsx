import { useEffect, useRef, useState } from "react";

import { isMobileAtom } from "@/store";
import { useRecoilValue } from "recoil";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
  onPercent?: boolean;
  blackMode?: boolean;
}

function Battery({ onPercent = false, blackMode = false }: Props) {
  const isMobile = useRecoilValue(isMobileAtom);
  const batteryInnerRef = useRef<HTMLDivElement>(null);
  const [isSupport, setIsSupport] = useState(false);
  const [batteryPercent, setBatteryPercent] = useState(0);

  const updateBatteryPercent = (battery: { level: number }) => {
    setBatteryPercent(battery.level * 100);
    console.log(battery.level);
  };

  useEffect(() => {
    const isSupported = window.navigator && "getBattery" in window.navigator;

    const updateBatteryStatus = () => {
      if (isSupported) {
        window.navigator.getBattery?.().then((battery: any) => {
          updateBatteryPercent(battery);
          battery.onlevelchange = () => {
            updateBatteryPercent(battery);
          };
        });
      }
    };

    if (isSupported) {
      setIsSupport(true);
      updateBatteryStatus();
    }
  }, []);

  useEffect(() => {
    if (batteryInnerRef.current) {
      batteryInnerRef.current.style.width = `${batteryPercent}%`;
    }
  }, [batteryPercent]);

  if (!isSupport || batteryPercent === 0) {
    return null;
  }

  return (
    <Container>
      {onPercent && (
        <Percentage blackMode={blackMode} isMobile={isMobile}>
          {batteryPercent.toFixed()}%
        </Percentage>
      )}

      <Outer blackMode={blackMode} isMobile={isMobile}>
        <Inner blackMode={blackMode} ref={batteryInnerRef} />
      </Outer>
    </Container>
  );
}

export default Battery;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Percentage = styled.div<{ blackMode: boolean; isMobile: boolean }>`
  color: var(--white);
  font-size: 13px;
  margin-right: 4px;

  ${({ blackMode }) =>
    blackMode &&
    css`
      color: var(--black);
    `};

  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 15px;
    `};
`;

const Outer = styled.div<{ blackMode: boolean; isMobile: boolean }>`
  position: relative;
  width: 20px;
  height: 8px;
  border-radius: 4px;
  border: 1px solid var(--white);
  padding: 1.2px;

  ${({ isMobile }) =>
    isMobile &&
    css`
      width: 23px;
      height: 10px;
    `};

  &::before {
    content: "";
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: -4px;
    width: 1.8px;
    height: 4px;
    border-radius: 0 8px 8px 0;
    background-color: var(--white);
  }

  ${({ blackMode }) =>
    blackMode &&
    css`
      border: 1px solid var(--black);

      &::before {
        background-color: var(--black);
      }
    `};
`;

const Inner = styled.div<{ blackMode: boolean }>`
  height: 100%;
  border-radius: 2px;
  background-color: var(--white);

  ${({ blackMode }) =>
    blackMode &&
    css`
      background-color: var(--black);
    `};
`;
