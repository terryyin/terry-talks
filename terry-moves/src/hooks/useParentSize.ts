import { useEffect, useState, useRef } from 'react';

const useParentSize = (initialSize: { width: number; height: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [metrics, setSize] = useState({ ...initialSize, left: 0, top: 0 });

  useEffect(() => {
    if (ref.current) {
      const container = ref.current.parentElement;

      if(container) {
        const updateSize = () => {
          const width = container.clientWidth;
          const height = container.clientHeight;
          // Layout can be zero while React mounts or an animated stage is hidden.
          // Keep the last valid canvas size until its parent has dimensions again.
          if (width <= 0 || height <= 0) return;
          const rect = container.getBoundingClientRect();
          setSize({
            width,
            height,
            left: rect.left,
            top: rect.top,
          });
        };

        updateSize();
        const resizeObserver = new ResizeObserver(updateSize);

        resizeObserver.observe(container);

        return () => {
          resizeObserver.disconnect();
        };
      }
    }
  }, [ref]);

  return { ref, metrics };
};

export default useParentSize;
