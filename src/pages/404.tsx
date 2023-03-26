import { useGetWindow } from "@/hooks";
import Link from "next/link";

export default function Custom404() {
  const { isMobile } = useGetWindow();

  return (
    <div>
      <h1>잘못된 경로입니다.</h1>
      <Link href={isMobile ? "/mobile" : "/"}>Home</Link>
    </div>
  );
}
