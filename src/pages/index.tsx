import { DesktopHome } from "@/components/Desktop";
import { MobileHome } from "@/components/Mobile";
import { useGetWindow } from "@/hooks";

export default function Home() {
  const { isMobile } = useGetWindow();

  return <>{isMobile ? <MobileHome /> : <DesktopHome />}</>;
}
