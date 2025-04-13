'use client';

import { useEffect, useRef, useState } from 'react';

type FluidCursorProps = {
  color?: string;
  size?: number;
  trailLength?: number;
  trailOpacity?: number;
  speed?: number;
};

const FluidCursor = ({
  color = '#3b82f6',
  size = 24,
  trailLength = 8,
  trailOpacity = 0.3,
  speed = 0.5,
}: FluidCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    Array(trailLength + 1).fill({ x: -100, y: -100 })
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      // Update primary cursor position
      setPositions((prev) => {
        const newPositions = [...prev];
        newPositions[0] = { x: event.clientX, y: event.clientY };
        return newPositions;
      });
      setIsVisible(true);
    };

    const mouseLeaveHandler = () => {
      setIsVisible(false);
    };

    const mouseEnterHandler = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseleave', mouseLeaveHandler);
    document.addEventListener('mouseenter', mouseEnterHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseleave', mouseLeaveHandler);
      document.removeEventListener('mouseenter', mouseEnterHandler);
    };
  }, []);

  useEffect(() => {
    // Trail effect animation frame
    const updateTrailPositions = () => {
      setPositions((prev) => {
        const newPositions = [...prev];
        
        // Update each trail element position based on the one before it
        for (let i = trailLength; i > 0; i--) {
          // Move each dot toward the previous one with some easing
          newPositions[i] = {
            x: newPositions[i].x + (newPositions[i - 1].x - newPositions[i].x) * speed,
            y: newPositions[i].y + (newPositions[i - 1].y - newPositions[i].y) * speed,
          };
        }
        
        return newPositions;
      });
      
      animationFrameId = requestAnimationFrame(updateTrailPositions);
    };
    
    let animationFrameId = requestAnimationFrame(updateTrailPositions);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, trailLength]);

  // Generate the trail elements
  useEffect(() => {
    cursorTrailsRef.current = Array(trailLength).fill(null);
  }, [trailLength]);

  // Callback to set refs for trail elements
  const setTrailRef = (index: number) => (el: HTMLDivElement | null) => {
    if (cursorTrailsRef.current.length > index) {
      cursorTrailsRef.current[index] = el;
    }
  };

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-300"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: color,
          left: `${positions[0].x}px`,
          top: `${positions[0].y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Cursor trails */}
      {Array.from({ length: trailLength }).map((_, index) => (
        <div
          key={index}
          ref={setTrailRef(index)}
          className="pointer-events-none fixed z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 will-change-transform"
          style={{
            width: `${Math.max(size * (1 - (index / trailLength) * 0.7), size * 0.3)}px`,
            height: `${Math.max(size * (1 - (index / trailLength) * 0.7), size * 0.3)}px`,
            borderRadius: '50%',
            backgroundColor: color,
            left: `${positions[index + 1].x}px`,
            top: `${positions[index + 1].y}px`,
            opacity: isVisible ? trailOpacity * (1 - index / trailLength) : 0,
          }}
        />
      ))}
    </>
  );
};

export default FluidCursor; 