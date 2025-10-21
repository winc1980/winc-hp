import { useEffect, useRef, useState } from "react";

export type ScrollDirection = 'up' | 'down';

export const useScrollStatus = (
  initialDirection: ScrollDirection = 'down',
) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(initialDirection);
  const scrollDirectionRef = useRef<ScrollDirection | null>(null);
  scrollDirectionRef.current = scrollDirection;

  const [isScrollTop, setIsScrollTop] = useState(true);
  const isScrollTopRef = useRef(isScrollTop);
  isScrollTopRef.current = isScrollTop;

  useEffect(() => {
    const bodyElement = document.querySelector('body');
    if (!bodyElement) return;

    const onWheel = (e: WheelEvent) => {
      if (
        (e.deltaY < 0 && scrollDirectionRef.current !== 'up') ||
        (e.deltaY > 0 && scrollDirectionRef.current !== 'down')
      ) {
        if (e.deltaY < 0) setScrollDirection('up');
        if (e.deltaY > 0) setScrollDirection('down');
      }

      if ((window.scrollY === 0) !== (isScrollTopRef.current)) {
        setIsScrollTop(window.scrollY === 0);
      }
    };

    bodyElement.addEventListener('wheel', onWheel, { passive: true });
    return () => bodyElement.removeEventListener('wheel', onWheel);
  }, []);

  return [scrollDirection, isScrollTop] as const;
};
