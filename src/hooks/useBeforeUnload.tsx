import { useEffect } from "react";

export function useBeforeUnload(shouldBlock: boolean) {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!shouldBlock) return;
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldBlock]);
}
