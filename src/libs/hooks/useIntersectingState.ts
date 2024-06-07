/* eslint-disable */

'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

function useIntersectingState<T extends Element>(): [boolean, RefObject<T>];

function useIntersectingState<T extends Element>(initialState: null): [boolean | null, RefObject<T>];

function useIntersectingState<T extends Element>(initialState?: null): [boolean | (boolean | null), RefObject<T>] {
  const [isIntersecting, setIsIntersecting] = useState(initialState === null ? null : false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref.current]);

  return [isIntersecting, ref];
}

export default useIntersectingState;
