import { useEffect, useRef, useState } from "react";

import { isMobileAtom } from "@/store";
import { useRecoilValue } from "recoil";

import styles from "./Battery.module.scss";
import classNames from "classnames";

interface Props {
  onPercent?: boolean;
  blackMode?: boolean;
}

export default function Battery({
  onPercent = false,
  blackMode = false,
}: Props) {
  const isMobile = useRecoilValue(isMobileAtom);
  const batteryInnerRef = useRef<HTMLDivElement>(null);
  const [isSupport, setIsSupport] = useState(false);
  const [batteryPercent, setBatteryPercent] = useState(0);

  const updateBatteryPercent = (battery: { level: number }) => {
    setBatteryPercent(battery.level * 100);
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

  if (!isSupport) {
    return null;
  }

  return (
    <div className={styles.container}>
      {onPercent && (
        <div
          className={classNames(styles.percentage, {
            [styles.blackMode]: blackMode,
            [styles.isMobile]: isMobile,
          })}
        >
          {batteryPercent.toFixed()}%
        </div>
      )}

      <div
        className={classNames(styles.batteryOuter, {
          [styles.blackMode]: blackMode,
          [styles.isMobile]: isMobile,
        })}
      >
        <div
          ref={batteryInnerRef}
          className={classNames(styles.batteryInner, {
            [styles.blackMode]: blackMode,
          })}
        />
      </div>
    </div>
  );
}
