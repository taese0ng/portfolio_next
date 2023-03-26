import { useContext } from "react";
import { SizeContext } from "@/components/shared/WindowSizeContext";

function useGetWindow() {
  return useContext(SizeContext);
}

export default useGetWindow;
