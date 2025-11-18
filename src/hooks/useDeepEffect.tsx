import { useEffect, useRef } from "react";
import _ from "lodash";

export function useDeepEffect(callback: () => void | (() => void), deps: any[]) {
  const previousDepsRef = useRef<any[]>([]);

  if (!previousDepsRef.current || !_.isEqual(previousDepsRef.current, deps)) {
    previousDepsRef.current = deps;
  }

  useEffect(callback, [previousDepsRef.current]);
}
