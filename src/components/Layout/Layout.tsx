import useGetWindow from "@/hooks/useGetWindow";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const router = useRouter();
  const { isMobile } = useGetWindow();

  useEffect(() => {
    if (isMobile) {
      router.replace("/mobile");
    } else {
      router.replace("/");
    }
  }, [isMobile]);

  return <>{children}</>;
}

export default Layout;
