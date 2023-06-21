import { useEffect, useState, createContext, ReactNode } from "react";

const defaultContext = { isMobile: false };

export const SizeContext = createContext(defaultContext);

interface Props {
  children: ReactNode;
}

const MOBILE_SIZE = 1060;

function WindowSizeContext({ children }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      const width = document.documentElement.clientWidth;

      setIsMobile(width <= MOBILE_SIZE);
    };

    window.addEventListener("resize", checkWindowSize);

    checkWindowSize();

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <SizeContext.Provider value={{ isMobile }}>{children}</SizeContext.Provider>
  );
}

export default WindowSizeContext;
