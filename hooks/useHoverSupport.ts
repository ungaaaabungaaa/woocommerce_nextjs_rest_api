import { useState, useEffect } from "react";

export function useHoverSupport() {
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    // Check if the device supports hover
    const mq = window.matchMedia("(hover: hover)");
    setSupportsHover(mq.matches);

    // Listen for changes (e.g., when connecting an external mouse to a touch device)
    const listener = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
    mq.addListener(listener);

    return () => mq.removeListener(listener);
  }, []);

  return supportsHover;
}
