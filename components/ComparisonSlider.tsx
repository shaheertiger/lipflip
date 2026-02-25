'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  labelBefore?: string;
  labelAfter?: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  labelBefore = "Before",
  labelAfter = "After"
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

  // Slider Position (0-100%)
  const [position, setPosition] = useState(50);

  // Zoom & Pan State
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [startPan, setStartPan] = useState({ x: 0, y: 0 }); // Mouse position at start of drag
  const [initialPan, setInitialPan] = useState({ x: 0, y: 0 }); // Pan value at start of drag
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // --- Helpers ---

  const getContainerDimensions = () => {
    if (!containerRef.current) return { width: 0, height: 0 };
    return {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight
    };
  };

  const constrainPan = (newPan: { x: number; y: number }, currentScale: number) => {
    const { width, height } = getContainerDimensions();
    // Calculate max pan allowed (so image doesn't drift away completely)
    // We want the image to always cover the container if scale >= 1
    // Using transform-origin: center center (default).
    // Scaled Width = width * scale
    // Overflow X = (Scaled Width - width) / 2
    // Max Pan X (+/-) = Overflow X

    const maxPanX = (width * currentScale - width) / 2;
    const maxPanY = (height * currentScale - height) / 2;

    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, newPan.x)),
      y: Math.max(-maxPanY, Math.min(maxPanY, newPan.y))
    };
  };

  // --- Event Handlers for Slider ---

  const handleSlideMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      const newPosition = Math.max(0, Math.min(100, (x / width) * 100));
      setPosition(newPosition);
    }
  }, []);

  const handleSlideStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevent pan start
    setIsResizing(true);
  };

  // --- Event Handlers for Panning ---

  const handlePanStart = (clientX: number, clientY: number) => {
    if (scale > 1) {
      setIsPanning(true);
      setStartPan({ x: clientX, y: clientY });
      setInitialPan({ ...pan });
    }
  };

  const handlePanMove = useCallback((clientX: number, clientY: number) => {
    if (isPanning) {
      const dx = clientX - startPan.x;
      const dy = clientY - startPan.y;

      const newPanRaw = {
        x: initialPan.x + dx,
        y: initialPan.y + dy
      };

      setPan(constrainPan(newPanRaw, scale));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPanning, initialPan, startPan, scale]);

  // --- Global Mouse/Touch Listeners ---
  const requestRef = useRef<number | null>(null);
  const latestCoords = useRef<{ x: number, y: number } | null>(null);

  const updatePosition = useCallback(() => {
    if (!latestCoords.current) return;

    if (isResizing) {
      handleSlideMove(latestCoords.current.x);
    } else if (isPanning) {
      handlePanMove(latestCoords.current.x, latestCoords.current.y);
    }

    requestRef.current = requestAnimationFrame(updatePosition);
  }, [isResizing, isPanning, handleSlideMove, handlePanMove]);

  useEffect(() => {
    if (isResizing || isPanning) {
      requestRef.current = requestAnimationFrame(updatePosition);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isResizing, isPanning, updatePosition]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isResizing || isPanning) {
        latestCoords.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      setIsResizing(false);
      setIsPanning(false);
      latestCoords.current = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if ((isResizing || isPanning) && e.touches.length > 0) {
        latestCoords.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        if (isPanning && e.cancelable) e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      setIsResizing(false);
      setIsPanning(false);
      latestCoords.current = null;
    };

    if (isResizing || isPanning) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isResizing, isPanning]);

  // --- Zoom Controls ---

  const handleZoomIn = () => {
    setScale(s => Math.min(s + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale(s => {
      const newScale = Math.max(s - 0.5, 1);
      // Re-constrain pan if we zoom out
      setPan(p => constrainPan(p, newScale));
      return newScale;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setPosition(50);
  };

  // --- Render Helpers ---

  // Common transform style
  const transformStyle = {
    transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
    transformOrigin: 'center center',
    transition: isPanning ? 'none' : 'transform 0.3s ease-out' // Smooth zoom, instant pan
  };

  const containerCursor = isResizing
    ? 'cursor-ew-resize'
    : scale > 1
      ? isPanning ? 'cursor-grabbing' : 'cursor-grab'
      : 'cursor-default';

  return (
    <div className="relative group w-full max-w-4xl mx-auto select-none">

      {/* Main Container */}
      <div
        className={`relative aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 ${containerCursor}`}
        ref={containerRef}
        onMouseDown={(e) => {
          // If clicking background and zoomed in, start pan. 
          if (scale > 1) handlePanStart(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          if (scale > 1 && e.touches.length > 0) handlePanStart(e.touches[0].clientX, e.touches[0].clientY);
        }}
      >
        {/* Images Wrapper */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">

          {/* After Image (Background) */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={afterImage}
              alt="After Lip Flip"
              className="w-full h-full object-cover pointer-events-none will-change-transform"
              style={transformStyle}
            />
          </div>

          {/* Before Image (Foreground - Clipped) */}
          <div
            className="absolute inset-0 h-full overflow-hidden pointer-events-none z-10"
            style={{ width: `${position}%` }}
          >
            {/* Inner container for before image to counteract clip width and apply transform */}
            <div
              className="absolute top-0 left-0 h-full"
              style={{ width: containerWidth ?? '100%' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={beforeImage}
                alt="Before Lip Flip"
                className="w-full h-full object-cover will-change-transform"
                style={transformStyle}
              />
            </div>
          </div>
        </div>

        {/* --- UI Overlays (Not transformed) --- */}

        {/* Labels - fade out when zoomed to avoid clutter? Or keep them. */}
        <div className={`transition-opacity duration-300 ${scale > 1.2 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white text-[10px] tracking-widest uppercase font-bold px-4 py-2 rounded-full pointer-events-none z-20 border border-white/10 shadow-lg">
            {labelAfter}
          </div>
          <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white text-[10px] tracking-widest uppercase font-bold px-4 py-2 rounded-full pointer-events-none z-20 border border-white/20 shadow-lg">
            {labelBefore}
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white/50 backdrop-blur-sm z-30 pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          style={{ left: `${position}%` }}
        />

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-12 bg-transparent cursor-ew-resize z-40 group-hover:bg-white/5 transition-colors touch-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleSlideStart}
          onTouchStart={handleSlideStart}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/40 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-white transform hover:scale-110 active:scale-95 transition-all duration-200">
            <ChevronsLeftRight size={20} strokeWidth={2.5} />
          </div>
        </div>

      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-full shadow-xl">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 1}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>

          <div className="w-px h-4 bg-white/10 mx-1" />

          <span className="text-xs font-medium text-white/70 w-12 text-center select-none">
            {Math.round(scale * 100)}%
          </span>

          <div className="w-px h-4 bg-white/10 mx-1" />

          <button
            onClick={handleZoomIn}
            disabled={scale >= 4}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
        </div>

        <button
          onClick={handleReset}
          className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-xl"
          title="Reset View"
        >
          <RotateCcw size={16} />
        </button>

        {scale > 1 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/20 rounded-full text-pink-200 text-xs animate-fade-in">
            <Move size={12} />
            <span>Drag to pan</span>
          </div>
        )}
      </div>
    </div>
  );
};
