import { useEffect, useState } from "react";

// Define a type for the window size
type WindowSize = {
  width: number;
  height: number;
};

const useCustomWindowSize = (initW: number, initH: number): WindowSize => {
  // Initialize state with window's width and height
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : initW,
    height: typeof window !== "undefined" ? window.innerHeight : initH,
  });

  useEffect(() => {
    // Define a function to handle resize events
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return windowSize;
};

export default useCustomWindowSize;
